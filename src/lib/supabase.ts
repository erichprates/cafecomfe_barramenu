import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ivbvgltqspevvhlnvenl.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2YnZnbHRxc3BldnZobG52ZW5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTY3ODksImV4cCI6MjA0OTQzMjc4OX0.sz7YwHPLQq1JWtCZ-0Q5BSpv-Qm4qwdivVy0ql48Gj4';

// Obtém a URL base da aplicação
const siteUrl = window.location.origin;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    redirectTo: `${siteUrl}/auth/callback`
  },
  storage: {
    // Configuração para storage se necessário
  }
});

// Adicione esta função helper para buscar perfil
export async function get(userId: string) {
  try {
    const { data, error } = await supabase
      .from('s')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    throw error;
  }
}

// Modifique a função uploadAvatar para usar o novo formato
export async function uploadAvatar(file: File, userId: string) {
  try {
    // Remove avatar antigo se existir
    const { data: existingFiles } = await supabase.storage
      .from('avatars')
      .list(userId); // Removido o 'public/' do path

    if (existingFiles?.length) {
      await supabase.storage
        .from('avatars')
        .remove(existingFiles.map(f => `${userId}/${f.name}`));
    }

    // Upload do novo avatar
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { // Removido o 'public/' do path
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) throw uploadError;

    // Atualiza o perfil do usuário com a URL do avatar
    const { data: publicUrl } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName); // Removido o 'public/' do path

    const { error: updateError } = await supabase
      .from('s')
      .update({ 
        avatar_url: publicUrl.publicUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (updateError) throw updateError;

    return publicUrl.publicUrl;
  } catch (error) {
    console.error('Erro no upload do avatar:', error);
    throw error;
  }
}

// Modifique a função checkFavorite
export async function checkFavorite(userId: string, devotionalDay: number) {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('devotional_day', devotionalDay)
      .single();

    if (error && error.code !== 'PGRST116') { // Ignora erro de não encontrado
      console.error('Erro ao verificar favorito:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Erro ao verificar favorito:', error);
    return false;
  }
}

// Modifique a função toggleFavorite
export async function toggleFavorite(userId: string, devotionalDay: number) {
  try {
    const isFavorite = await checkFavorite(userId, devotionalDay);

    if (isFavorite) {
      // Remove dos favoritos
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('devotional_day', devotionalDay);

      if (error) throw error;
      return false;
    } else {
      // Adiciona aos favoritos
      const { error } = await supabase
        .from('favorites')
        .insert({
          user_id: userId,
          devotional_day: devotionalDay
        });

      if (error) throw error;
      return true;
    }
  } catch (error) {
    console.error('Erro ao alternar favorito:', error);
    throw error;
  }
}