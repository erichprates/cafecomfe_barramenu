import { DevotionalHeader } from './DevotionalHeader';
import { DevotionalContent } from './DevotionalContent';
import { ReadingHistory } from '../features/ReadingHistory';
import type { DevotionalListProps } from '../../types/devotional';

export function DevotionalList({ devotional, today }: DevotionalListProps) {
  return (
    <>
      <DevotionalHeader 
        date={today}
        title={devotional.title}
      />
      <div className="mt-6">
        <DevotionalContent devotional={devotional} />
      </div>
      <ReadingHistory />
    </>
  );
}