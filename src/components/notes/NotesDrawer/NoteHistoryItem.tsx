import { formatDateTime } from '../../../utils/formatters';
import type { Note } from '../../../types/notes';

interface NoteHistoryItemProps {
  note: Note;
}

export function NoteHistoryItem({ note }: NoteHistoryItemProps) {
  return (
    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {formatDateTime(note.created_at)}
      </p>
      <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
        {note.content}
      </p>
    </div>
  );
}