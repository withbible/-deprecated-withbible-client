/* eslint-disable no-restricted-globals */
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("push", (event) => {
  if (!event.data.json()) {
    return;
  }

  const resultData = event.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    ...resultData,
  };
  console.log("push: ", resultData);

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  console.log("notification click");
  const url = "/";
  event.notification.close();
  // eslint-disable-next-line no-undef
  event.waitUntil(clients.openWindow(url));
});
