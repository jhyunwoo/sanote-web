self.__WB_DISABLE_DEV_LOGS = true

self.addEventListener("push", event => {
  const title = event.data.text()
  EventCounts.waitUntil(self.ServiceWorkerRegistration.showNotification(title))
})
