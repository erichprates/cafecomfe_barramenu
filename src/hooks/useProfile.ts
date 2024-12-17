import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Profile {
  id: string;
  name: string | null;
  avatar_url: string | null;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  async function loadProfile() {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
        
      setProfile(data);
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return { profile, isLoading };
}