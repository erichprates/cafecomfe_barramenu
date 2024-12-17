import { DevotionalCard } from '../cards/DevotionalCard';
import { DevotionalHeader } from './DevotionalHeader';
import { BibleVerse } from '../BibleVerse';
import { Devotional } from '../Devotional';
import { PracticalApplication } from '../PracticalApplication';
import { SpotifyPlayer } from '../SpotifyPlayer';
import { UserMenu } from '../auth/UserMenu';
import type { DevotionalType } from '../../types/devotional';

interface DevotionalContainerProps {
  devotional: DevotionalType;
  today: string;
}

export function DevotionalContainer({ devotional, today }: DevotionalContainerProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <UserMenu />
      </div>

      <DevotionalCard>
        <DevotionalHeader
          date={today}
          title={devotional.title}
          devotionalDay={devotional.day}
        />
      </DevotionalCard>

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

      <DevotionalCard>
        <SpotifyPlayer day={devotional.day} />
      </DevotionalCard>
    </div>
  );
}