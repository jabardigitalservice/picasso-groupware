<template>
  <div class="hello">
    <template v-if="!loading">
      <h1>{{ msg }}</h1>

      <ul v-if="records.length > 0">
        <li v-for="record in records" :key="record.id">{{ record.title }}</li>
      </ul>
    </template>
    <template v-else>
      <content-loader-common/>
    </template>
  </div>
</template>

<script>
import { db } from '../lib/firebase'
import ContentLoaderCommon from './ContentLoaderCommon'

export default {
  props: {
    msg: String
  },

  components: {
    ContentLoaderCommon
  },

  data () {
    return {
      loading: true,
      records: []
    }
  },

  created () {
    db.collection('articles')
      .get()
      .then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => doc.data())

        this.records = documents

        this.loading = false
      })
  }
}
</script>
