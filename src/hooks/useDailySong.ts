import { useState, useEffect } from 'react';
import { DAILY_SONGS } from '../constants/dailySongs';

export function useDailySong() {
  const [currentSong, setCurrentSong] = useState(() => {
    const hour = new Date().getHours();
    const index = Math.floor(hour / 8) % DAILY_SONGS.length;
    return DAILY_SONGS[index];
  });

  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      const index = Math.floor(hour / 8) % DAILY_SONGS.length;
      setCurrentSong(DAILY_SONGS[index]);
    };

    const interval = setInterval(checkTime, 1000 * 60); // Verifica a cada minuto
    return () => clearInterval(interval);
  }, []);

  return currentSong;
}