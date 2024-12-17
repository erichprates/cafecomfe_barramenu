export async function setupNotifications() {
  try {
    if (!('Notification' in window)) {
      console.log('Este navegador não suporta notificações desktop');
      return;
    }

    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      // Registrar service worker para notificações push
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registrado:', registration);
    }
  } catch (error) {
    console.error('Erro ao configurar notificações:', error);
  }
}

export async function scheduleNotification(title: string, options: NotificationOptions) {
  if (Notification.permission === 'granted') {
    const registration = await navigator.serviceWorker.ready;
    const timestamp = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 horas

    try {
      await registration.showNotification(title, {
        ...options,
        timestamp,
        tag: 'daily-devotional'
      });
    } catch (error) {
      console.error('Erro ao agendar notificação:', error);
    }
  }
}