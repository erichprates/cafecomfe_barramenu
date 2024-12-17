import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export function useReadingHistory() {
  const [history, setHistory] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        let userId = localStorage.getItem('user_id');
        if (!userId) {
          userId = uuidv4();
          localStorage.setItem('user_id', userId);
        }

        const { data } = await supabase
          .from('reading_history')
          .select('devotional_day')
          .eq('user_id', userId)
          .order('read_at', { ascending: false });

        if (data) {
          setHistory(data.map(item => item.devotional_day));
        }
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return { history, isLoading };
}