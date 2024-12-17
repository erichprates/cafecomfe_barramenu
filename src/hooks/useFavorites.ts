import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { DevotionalType } from '../types/devotional';

export function useFavorites(devotionalDay?: number) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<DevotionalType[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadFavorites();
      if (devotionalDay) {
        checkFavorite();
      }
    }
  }, [user, devotionalDay]);

  async function loadFavorites() {
    try {
      const { data } = await supabase
        .from('favorites')
        .select(`
          devotional_day,
          devotionals (*)
        `)
        .eq('user_id', user?.id);
        
      setFavorites(data?.map(f => f.devotionals) || []);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function checkFavorite() {
    if (!devotionalDay) return;
    
    try {
      const { data } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user?.id)
        .eq('devotional_day', devotionalDay)
        .single();

      setIsFavorite(!!data);
    } catch (error) {
      console.error('Erro ao verificar favorito:', error);
    }
  }

  async function toggleFavorite() {
    if (!user || !devotionalDay || isLoading) return;

    try {
      setIsLoading(true);

      if (isFavorite) {
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('devotional_day', devotionalDay);
      } else {
        await supabase
          .from('favorites')
          .insert([{ user_id: user.id, devotional_day: devotionalDay }]);
      }

      setIsFavorite(!isFavorite);
      await loadFavorites();
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    isLoading
  };
}