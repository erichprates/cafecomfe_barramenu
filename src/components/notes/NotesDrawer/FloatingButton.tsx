import { BookOpen } from 'lucide-react';

interface FloatingButtonProps {
  onClick: () => void;
}

export function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      aria-label="Ver histórico de anotações"
    >
      <BookOpen className="w-6 h-6" />
    </button>
  );
}