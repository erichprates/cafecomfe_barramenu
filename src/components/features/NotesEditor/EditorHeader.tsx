import { Save } from 'lucide-react';

interface EditorHeaderProps {
  onSave: () => void;
}

export function EditorHeader({ onSave }: EditorHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Minhas Anotações
      </h3>
      <button
        onClick={onSave}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
        aria-label="Salvar anotações"
      >
        <Save className="w-5 h-5" />
      </button>
    </div>
  );
}