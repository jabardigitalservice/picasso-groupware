import { messaging } from './firebase'

const isFn = (fn) => typeof fn === 'function'

export function initFCM ({
  onEmpty = null,
  onRetrievalSuccess = null,
  onRetrievalError = null,
  onRefreshed = null
}) {
  messaging.getToken().then((currentToken) => {
    if (currentToken) {
      console.log('onRetrievalSuccess')
      isFn(onRetrievalSuccess) && onRetrievalSuccess(currentToken)
    } else {
      console.log('onEmpty')
      isFn(onEmpty) && onEmpty()
    }
  }).catch((err) => {
    console.error('onRetrievalError')
    isFn(onRetrievalError) && onRetrievalError(err)
  })

  messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
      console.log('onRefreshed')
      isFn(onRefreshed) && onRefreshed(refreshedToken)
    }).catch((err) => {
      console.error('onRetrievalError')
      isFn(onRetrievalError) && onRetrievalError(err)
    })
  })
}
