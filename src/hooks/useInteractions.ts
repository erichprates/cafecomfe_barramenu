import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useDevotional } from './useDevotional';

export function useInteractions() {
  const { devotional } = useDevotional();
  const [likes, setLikes] = useState(0);
  const [shares, setShares] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInteractions = async () => {
      if (!devotional) return;

      try {
        setIsLoading(true);
        
        // Buscar interações para o devocional atual
        const { data, error } = await supabase
          .from('interactions')
          .select('*')
          .eq('devotional_day', devotional.day)
          .single();

        if (error) {
          // Se não encontrar, criar novo registro
          const { data: newData, error: insertError } = await supabase
            .from('interactions')
            .insert([{
              devotional_day: devotional.day,
              likes: 0,
              shares: 0
            }])
            .select()
            .single();

          if (insertError) throw insertError;
          
          setLikes(newData.likes);
          setShares(newData.shares);
        } else {
          setLikes(data.likes);
          setShares(data.shares);
        }

        setError(null);
      } catch (err: any) {
        console.error('Erro ao carregar interações:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInteractions();
  }, [devotional]);

  const updateLikes = async (value: number) => {
    if (!devotional || value < 0 || isLoading) return;

    try {
      const { error } = await supabase
        .from('interactions')
        .update({ likes: value })
        .eq('devotional_day', devotional.day);

      if (error) throw error;
      setLikes(value);
      setError(null);
    } catch (err: any) {
      console.error('Erro ao atualizar likes:', err);
      setError(err.message);
    }
  };

  const updateShares = async (value: number) => {
    if (!devotional || value < 0 || isLoading) return;

    try {
      const { error } = await supabase
        .from('interactions')
        .update({ shares: value })
        .eq('devotional_day', devotional.day);

      if (error) throw error;
      setShares(value);
      setError(null);
    } catch (err: any) {
      console.error('Erro ao atualizar compartilhamentos:', err);
      setError(err.message);
    }
  };

  return {
    likes,
    shares,
    setLikes: updateLikes,
    setShares: updateShares,
    isLoading,
    error
  };
}