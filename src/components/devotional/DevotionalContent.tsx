import { BibleVerse } from '../BibleVerse';
import { Devotional } from '../Devotional';
import { PracticalApplication } from '../PracticalApplication';
import { NotesSection } from './NotesSection';
import { DevotionalCard } from '../cards/DevotionalCard';
import type { DevotionalContentProps } from '../../types/devotional';

export function DevotionalContent({ devotional }: DevotionalContentProps) {
  return (
    <div className="space-y-6">
      <DevotionalCard>
        <BibleVerse
          book={devotional.verse_book}
          chapter={devotional.verse_chapter}
          verse={devotional.verse_number}
          text={devotional.verse_text}
          reference={devotional.verse_reference}
        />
      </DevotionalCard>

      <DevotionalCard>
        <Devotional text={devotional.devotional_text} />
      </DevotionalCard>

      <DevotionalCard>
        <PracticalApplication text={devotional.practical_text} />
      </DevotionalCard>

      <NotesSection devotionalDay={devotional.day} />
    </div>
  );
}