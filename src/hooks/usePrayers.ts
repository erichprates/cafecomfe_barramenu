import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Prayer {
  id: number;
  content: string;
  created_at: string;
  user_id: string;
  s: {
    name: string | null;
    avatar_url: string | null;
  };
}

export function usePrayers() {
  const { user } = useAuth();
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadPrayers() {
    try {
      const { data } = await supabase
        .from('prayers')
        .select(`
          *,
          s (
            name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });
        
      setPrayers(data || []);
    } catch (error) {
      console.error('Erro ao carregar orações:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPrayers();
  }, []);

  async function addPrayer(content: string) {
    if (!user || !content.trim()) return;

    try {
      await supabase
        .from('prayers')
        .insert([{ user_id: user.id, content }]);
        
      await loadPrayers();
      return true;
    } catch (error) {
      console.error('Erro ao adicionar oração:', error);
      return false;
    }
  }

  return {
    prayers,
    isLoading,
    addPrayer
  };
}