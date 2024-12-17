import { useState } from 'react';
import { Save } from 'lucide-react';
import { useNotes } from '../../hooks/useNotes';
import { NotesDrawer } from '../notes/NotesDrawer';

interface NotesEditorProps {
  devotionalDay: number;
}

export function NotesEditor({ devotionalDay }: NotesEditorProps) {
  const { notes, saveNotes, isLoading } = useNotes(devotionalDay);
  const [content, setContent] = useState(notes);

  const handleSave = () => {
    saveNotes(content);
  };

  if (isLoading) return null;

  return (
    <div className="relative">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Minhas Anotações
          </h3>
          <button
            onClick={handleSave}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            aria-label="Salvar anotações"
          >
            <Save className="w-5 h-5" />
          </button>
        </div>
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-32 p-2 border rounded-md bg-white dark:bg-gray-800 
                   border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200
                   focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                   focus:border-transparent resize-none"
          placeholder="Faça suas anotações aqui..."
        />
      </div>
      <NotesDrawer devotionalDay={devotionalDay} />
    </div>
  );
}