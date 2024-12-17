self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/icon.png',
    badge: '/badge.png',
    data: {
      url: self.location.origin
    }
  };

  event.waitUntil(
    self.registration.showNotification('Café com Fé', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});