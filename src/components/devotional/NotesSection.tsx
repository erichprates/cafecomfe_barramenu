import { NotesEditor } from '../features/NotesEditor';
import { DevotionalCard } from '../cards/DevotionalCard';

interface NotesSectionProps {
  devotionalDay: number;
}

export function NotesSection({ devotionalDay }: NotesSectionProps) {
  return (
    <DevotionalCard>
      <div className="bg-[#f5f5f5] dark:bg-gray-700 transition-colors duration-300">
        <NotesEditor devotionalDay={devotionalDay} />
      </div>
    </DevotionalCard>
  );
}