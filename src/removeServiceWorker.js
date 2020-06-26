export default function removeServiceWorker () {
  if (!navigator || !navigator.serviceWorker) {
    return
  }
  navigator.serviceWorker.getRegistrations()
    .then(async (registrations) => {
      for (let registration of registrations) {
        await registration.unregister()
      }
    })
}
