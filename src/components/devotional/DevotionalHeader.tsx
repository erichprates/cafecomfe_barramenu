import { Calendar } from 'lucide-react';
import { FavoriteButton } from '../features/FavoriteButton';
import { ShareButton } from '../features/ShareButton';
import { useShareDevotional } from '../../hooks/useShareDevotional';

interface DevotionalHeaderProps {
  date: string;
  title: string;
  devotionalDay: number;
}

export function DevotionalHeader({ date, title, devotionalDay }: DevotionalHeaderProps) {
  const { shareDevotional } = useShareDevotional();

  const handleShare = () => {
    shareDevotional({ title, date });
  };

  return (
    <div className="bg-[#d0e3bc] dark:bg-gray-700 px-8 py-6 transition-colors duration-300">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-3">
        <Calendar className="w-4 h-4" />
        <span className="text-sm font-light">{date}</span>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6 leading-tight">
        {title}
      </h1>
      <div className="flex items-center gap-4">
        <FavoriteButton devotionalDay={devotionalDay} />
        <button
          onClick={handleShare}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          aria-label="Compartilhar"
        >
          <ShareButton />
        </button>
      </div>
    </div>
  );
}