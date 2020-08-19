export default function makePromiseCancelable (promise) {
  let isCanceled = false
  const wrapper = new Promise((resolve, reject) => {
    promise.then((val) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      isCanceled ? reject({ isCanceled }) : resolve(val)
    })
    promise.catch((e) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      isCanceled ? reject({ isCanceled }) : reject(e)
    })
  })
  const cancelToken = {
    cancel: () => (isCanceled = true)
  }
  return [wrapper, cancelToken]
}
