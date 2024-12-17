import { useState } from 'react';
import { formatDate } from '../../../utils/formatters';
import { Plus, Trash } from 'lucide-react';
import { useNotes } from '../../../hooks/useNotes';
import type { Note } from '../../../types/notes';

interface NotesListProps {
  notes: Note[];
  devotionalTitle: string;
  onOpenModal: () => void;
}

export function NotesList({ notes, devotionalTitle, onOpenModal }: NotesListProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { deleteAllNotes } = useNotes(notes[0]?.devotional_day || 1);

  const handleDeleteAll = async () => {
    if (await deleteAllNotes()) {
      setShowDeleteConfirm(false);
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full">
              {notes.length}
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(new Date().toISOString())}
              </span>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {devotionalTitle}
              </h3>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onOpenModal}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Abrir"
            >
              <Plus className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Apagar todas as notas"
            >
              <Trash className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Alerta de confirmação de exclusão */}
      {showDeleteConfirm && (
        <div className="fixed top-0 left-0 right-0 transform translate-y-0 transition-transform duration-300 z-[60] bg-red-500 text-white">
          <div className="max-w-3xl mx-auto p-4 flex items-center justify-between">
            <p>Tem certeza que deseja excluir todas as anotações?</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-1 bg-red-600 rounded hover:bg-red-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteAll}
                className="px-4 py-1 bg-red-600 rounded hover:bg-red-700 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}