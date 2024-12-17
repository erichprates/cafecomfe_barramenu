import { Edit2, Trash2 } from 'lucide-react';
import { formatDateTime } from '../../../../utils/formatters';
import type { Note } from '../../../../types/notes';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (noteId: number) => void;
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {formatDateTime(note.created_at)}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="text-blue-500 hover:text-blue-600 p-1"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="text-red-500 hover:text-red-600 p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div 
          className="whitespace-pre-wrap"
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #ccc 31px, #ccc 32px)',
            lineHeight: '32px',
            minHeight: '200px'
          }}
        >
          {note.content}
        </div>
      </div>
    </div>
  );
}