import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { DAILY_SONGS } from '../constants/dailySongs';

interface SpotifyPlayerProps {
  day: number;
}

export function SpotifyPlayer({ day }: SpotifyPlayerProps) {
  const [song, setSong] = useState(DAILY_SONGS[0]);

  useEffect(() => {
    const songIndex = (day - 1) % DAILY_SONGS.length;
    setSong(DAILY_SONGS[songIndex]);
  }, [day]);

  const handlePlay = () => {
    if (song.spotifyUrl) {
      window.open(song.spotifyUrl, '_blank');
    }
  };

  return (
    <div className="bg-[#1d1d1b] dark:bg-gray-800 px-8 py-6 text-white transition-colors duration-300">
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-5 h-5 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        <span className="text-[#1DB954] font-semibold">Spotify</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="w-32 h-32 rounded-md overflow-hidden bg-gray-800 dark:bg-gray-900">
          <img
            src={song.coverUrl}
            alt={`${song.album} cover`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128?text=Album+Cover';
            }}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-3xl font-bold mb-2 text-white dark:text-gray-100">{song.title}</h3>
          <p className="text-sm text-gray-400 dark:text-gray-300">
            {song.artist} • {song.album} • {song.year} • {song.duration}
          </p>
        </div>
        <button
          onClick={handlePlay}
          className="p-3 rounded-full bg-[#1DB954] text-white hover:bg-[#1ed760] transition-colors"
          aria-label="Abrir no Spotify"
        >
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}