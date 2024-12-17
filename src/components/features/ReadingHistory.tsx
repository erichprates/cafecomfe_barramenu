import { Clock } from 'lucide-react';
import { useReadingHistory } from '../../hooks/useReadingHistory';

export function ReadingHistory() {
  const { history, isLoading } = useReadingHistory();

  if (isLoading || history.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Histórico de Leitura
        </h3>
      </div>
      <div className="space-y-2">
        {history.slice(0, 5).map((day) => (
          <div
            key={day}
            className="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer"
          >
            Devocional {day}
          </div>
        ))}
      </div>
    </div>
  );
}