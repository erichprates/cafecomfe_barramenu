export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatDateTime(dateString: string): string {
  return `${formatDate(dateString)} às ${formatTime(dateString)}`;
}