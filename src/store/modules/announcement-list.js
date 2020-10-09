import { db, Timestamp } from '../../lib/firebase'
import { formatDateLong } from '../../lib/date'
import addSeconds from 'date-fns/addSeconds'
import isBefore from 'date-fns/isBefore'

function extractFirebaseDocData (doc) {
  const data = doc.data()

  const { seconds, nanoseconds } = data.published_at
  const date = new Timestamp(seconds, nanoseconds).toDate()
  return {
    ...data,
    id: doc.id,
    published_at: formatDateLong(date)
  }
}

export const state = () => ({
  items: [],
  isLoading: true,
  lastFetchedTimestamp: null
})

export const mutations = {
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  },
  setItems (state, items) {
    state.lastFetchedTimestamp = Date.now()
    state.items = items
  }
}

export const actions = {
  async fetchItems ({ state, commit }) {
    if (state.lastFetchedTimestamp) {
      const shouldFetch = isBefore(addSeconds(state.lastFetchedTimestamp, 30), Date.now())
      if (!shouldFetch) {
        return
      }
    }
    commit('setLoading', true)

    const items = await db.collection('announcement')
      .orderBy('published_at', 'desc')
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          return []
        }
        return snapshot.docs.map(extractFirebaseDocData)
      })
    commit('setItems', items)
    commit('setLoading', false)
  },
  async fetchItemById ({ state }, { id }) {
    let item
    if (Array.isArray(state.items) && state.items.length) {
      item = state.items.find((item) => item.id === id)
    }

    if (item) {
      return item
    }

    item = await db.collection('announcement')
      .doc(id)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return null
        }
        return extractFirebaseDocData(doc)
      })

    return item
  }
}
