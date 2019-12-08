import firebase from 'firebase'

export default async (to, from, next) => {
  const result = await firebase.auth().getRedirectResult()

  if (result.user) {
    next('/')
  }

  next()
}
