import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Interaction } from '../types/supabase';

interface InteractionsState {
  interactions: Interaction;
  isLoading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  updateLikes: (value: number) => Promise<void>;
  updateShares: (value: number) => Promise<void>;
}

export const useInteractionsStore = create<InteractionsState>((set, get) => ({
  interactions: {
    id: 1,
    likes: 0,
    shares: 0,
    created_at: null,
  },
  isLoading: true,
  error: null,

  initialize: async () => {
    try {
      // Primeiro, tenta buscar o registro existente
      const { data: existingData, error: fetchError } = await supabase
        .from('interactions')
        .select('*')
        .eq('id', 1)
        .single();

      if (fetchError) {
        console.error('Erro ao buscar dados:', fetchError);
        
        // Se não encontrar, tenta criar um novo registro
        const { data: newData, error: insertError } = await supabase
          .from('interactions')
          .insert([{
            id: 1,
            likes: 0,
            shares: 0
          }])
          .select()
          .single();

        if (insertError) {
          throw insertError;
        }

        set({ 
          interactions: newData,
          isLoading: false,
          error: null
        });
        return;
      }

      set({ 
        interactions: existingData,
        isLoading: false,
        error: null
      });
    } catch (error: any) {
      console.error('Erro ao inicializar:', error);
      set({ 
        error: error.message,
        isLoading: false
      });
    }
  },

  updateLikes: async (value: number) => {
    if (value < 0 || get().isLoading) return;

    try {
      const { error } = await supabase
        .from('interactions')
        .update({ likes: value })
        .eq('id', 1);

      if (error) throw error;

      set(state => ({
        interactions: {
          ...state.interactions,
          likes: value
        },
        error: null
      }));
    } catch (error: any) {
      console.error('Erro ao atualizar likes:', error);
      set({ error: error.message });
    }
  },

  updateShares: async (value: number) => {
    if (value < 0 || get().isLoading) return;

    try {
      const { error } = await supabase
        .from('interactions')
        .update({ shares: value })
        .eq('id', 1);

      if (error) throw error;

      set(state => ({
        interactions: {
          ...state.interactions,
          shares: value
        },
        error: null
      }));
    } catch (error: any) {
      console.error('Erro ao atualizar shares:', error);
      set({ error: error.message });
    }
  },
}));