import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { DevotionalType } from '../types/devotional';

interface UseDevotionalReturn {
  devotional: DevotionalType | null;
  isLoading: boolean;
  error: string | null;
}

export function useDevotional(): UseDevotionalReturn {
  const [devotional, setDevotional] = useState<DevotionalType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCurrentDevotionalDay = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    // Alterna entre os dias 347-351 a cada 10 minutos
    return 347 + Math.floor(minutes / 10) % 5;
  };

  const fetchDevotional = async () => {
    try {
      setIsLoading(true);
      const currentDay = getCurrentDevotionalDay();
      
      const { data, error: fetchError } = await supabase
        .from('devotionals')
        .select('*')
        .eq('day', currentDay)
        .single();

      if (fetchError) throw fetchError;
      
      setDevotional(data);
      setError(null);
    } catch (err: any) {
      console.error('Erro ao buscar devocional:', err);
      setError(err.message);
      setDevotional(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDevotional();

    // Verifica a cada minuto se precisa atualizar o devocional
    const interval = setInterval(() => {
      const currentMinute = new Date().getMinutes();
      if (currentMinute % 10 === 0) { // Atualiza quando mudar o intervalo de 10 minutos
        fetchDevotional();
      }
    }, 60000); // Verifica a cada minuto

    return () => clearInterval(interval);
  }, []);

  return { devotional, isLoading, error };
}