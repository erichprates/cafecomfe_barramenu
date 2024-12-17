import { formatDateTime } from '../../../utils/formatters';
import type { Note } from '../../../types/notes';

interface AllNotesListProps {
  notes: Note[];
}

export function AllNotesList({ notes }: AllNotesListProps) {
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex flex-col gap-1 mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDateTime(note.created_at)}
            </span>
            <h4 className="text-gray-800 dark:text-gray-200 font-medium">
              {(note as any).devotionals?.title || 'Devocional'}
            </h4>
          </div>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {note.content}
          </p>
        </div>
      ))}
    </div>
  );
}