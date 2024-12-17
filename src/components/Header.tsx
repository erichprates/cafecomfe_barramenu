import { Calendar, Heart, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useInteractions } from '../hooks/useInteractions';
import { useDevotional } from '../hooks/useDevotional';

interface HeaderProps {
  date: string;
  title: string;
}

export function Header({ date, title }: HeaderProps) {
  const { devotional } = useDevotional();
  const { likes, shares, setLikes, setShares, isLoading } = useInteractions();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (devotional) {
      const key = `liked-day-${devotional.day}`;
      setIsLiked(localStorage.getItem(key) === 'true');
    }
  }, [devotional]);

  const handleShare = () => {
    if (isLoading || !devotional) return;
    
    const text = `🙏 *Café com Fé* ☕️\n\n*${title}*\n\n📖 Reflexão do dia: ${date}\n\n✨ Acesse agora e fortaleça sua fé:\n${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    setShares(shares + 1);
  };

  const handleLike = () => {
    if (isLoading || !devotional) return;

    const newIsLiked = !isLiked;
    const key = `liked-day-${devotional.day}`;
    setIsLiked(newIsLiked);
    localStorage.setItem(key, String(newIsLiked));
    
    const newLikes = likes + (newIsLiked ? 1 : -1);
    if (newLikes >= 0) {
      setLikes(newLikes);
    }
  };

  return (
    <div className="bg-[#d0e3bc] dark:bg-gray-700 px-8 py-6 transition-colors duration-300">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-3">
        <Calendar className="w-4 h-4" />
        <span className="text-sm font-light">{date}</span>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6 leading-tight">{title}</h1>
      <div className="flex gap-6">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 transition-colors duration-300"
          aria-label="Like"
          disabled={isLoading}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'
            }`}
          />
          <span className="text-xl font-medium text-gray-800 dark:text-gray-100">{likes}</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2"
          aria-label="Share"
          disabled={isLoading}
        >
          <Send className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="text-xl font-medium text-gray-800 dark:text-gray-100">{shares}</span>
        </button>
      </div>
    </div>
  );
}