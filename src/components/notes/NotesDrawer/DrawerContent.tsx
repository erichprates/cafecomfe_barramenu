import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NoteHistoryItem } from './NoteHistoryItem';
import type { Note } from '../../../types/notes';

interface DrawerContentProps {
  isOpen: boolean;
  onClose: () => void;
  notesHistory: Note[];
}

export function DrawerContent({ isOpen, onClose, notesHistory }: DrawerContentProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Histórico de Anotações
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          {notesHistory.slice(0, 5).map((note) => (
            <NoteHistoryItem key={note.id} note={note} />
          ))}
        </div>

        {notesHistory.length > 5 && (
          <button
            onClick={() => {
              onClose();
              navigate('/notes');
            }}
            className="mt-4 w-full text-center text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Ver todas as anotações
          </button>
        )}
      </div>
    </div>
  );
}