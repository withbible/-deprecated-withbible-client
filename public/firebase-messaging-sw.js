/* eslint-disable no-restricted-globals */
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("push", (event) => {
  console.log("push: ", event.data.json());

  if (!event.data.json()) {
    return;
  }

  const resultData = event.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };
  console.log("push: ", { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  console.log("notification click");
  const url = "/";
  event.notification.close();
  // eslint-disable-next-line no-undef
  event.waitUntil(clients.openWindow(url));
});
