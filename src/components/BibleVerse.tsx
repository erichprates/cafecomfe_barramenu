import { type } from 'os';

interface BibleVerseProps {
  book: string;
  chapter: string;
  verse: string;
  text: string;
  reference: string;
}

export function BibleVerse({ book, chapter, verse, text, reference }: BibleVerseProps) {
  return (
    <div className="bg-[#cccab6] dark:bg-gray-700 p-6 transition-colors duration-300">
      <div className="flex gap-4">
        <div className="flex flex-col items-center justify-center bg-black text-white dark:bg-gray-900 p-3 rounded-lg min-w-[60px]">
          <span className="text-sm font-bold">{book}</span>
          <span className="text-xs">{chapter}:{verse}</span>
        </div>
        <div className="flex-1">
          <p className="text-gray-800 dark:text-gray-100 mb-2 italic">{text}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{reference}</p>
        </div>
      </div>
    </div>
  );
}