import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Note } from '../types/notes';

export function useNotes(devotionalDay: number) {
  const [notes, setNotes] = useState('');
  const [notesHistory, setNotesHistory] = useState<Note[]>([]);
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllNotes = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('notes')
        .select(`
          *,
          devotionals (
            title,
            created_at
          )
        `)
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAllNotes(data || []);
    } catch (error) {
      console.error('Erro ao carregar todas as notas:', error);
    }
  }, []);

  const fetchNotes = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('notes')
        .select(`
          *,
          devotionals (
            title,
            created_at
          )
        `)
        .eq('user_id', session.user.id)
        .eq('devotional_day', devotionalDay)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setNotesHistory(data);
        if (data.length > 0) {
          setNotes(data[0].content);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar anotações:', error);
    } finally {
      setIsLoading(false);
    }
  }, [devotionalDay]);

  useEffect(() => {
    fetchNotes();
    fetchAllNotes();
  }, [fetchNotes, fetchAllNotes]);

  const saveNotes = async (content: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        alert('Você precisa estar logado para salvar anotações.');
        return false;
      }

      const { error } = await supabase
        .from('notes')
        .insert([
          {
            user_id: session.user.id,
            devotional_day: devotionalDay,
            content,
          },
        ]);

      if (error) throw error;

      await fetchNotes();
      await fetchAllNotes();
      return true;
    } catch (error: any) {
      console.error('Erro ao salvar anotações:', error);
      alert('Erro ao salvar anotação. Por favor, tente novamente.');
      return false;
    }
  };

  const updateNote = async (noteId: number, content: string) => {
    try {
      const { error } = await supabase
        .from('notes')
        .update({ content })
        .eq('id', noteId);

      if (error) throw error;

      await fetchNotes();
      await fetchAllNotes();
      return true;
    } catch (error) {
      console.error('Erro ao atualizar anotação:', error);
      alert('Erro ao atualizar anotação. Por favor, tente novamente.');
      return false;
    }
  };

  const deleteNote = async (noteId: number) => {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId);

      if (error) throw error;

      await fetchNotes();
      await fetchAllNotes();
      return true;
    } catch (error) {
      console.error('Erro ao excluir anotação:', error);
      alert('Erro ao excluir anotação. Por favor, tente novamente.');
      return false;
    }
  };

  const deleteAllNotes = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return false;

      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('user_id', session.user.id)
        .eq('devotional_day', devotionalDay);

      if (error) throw error;

      await fetchNotes();
      await fetchAllNotes();
      return true;
    } catch (error) {
      console.error('Erro ao excluir todas as anotações:', error);
      alert('Erro ao excluir anotações. Por favor, tente novamente.');
      return false;
    }
  };

  return { 
    notes, 
    notesHistory,
    allNotes,
    saveNotes, 
    updateNote,
    deleteNote,
    deleteAllNotes,
    isLoading 
  };
}