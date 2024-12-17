import { useState, useEffect } from 'react';
import { Layout } from '../components/layout';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { uploadAvatar } from '../lib/supabase';
import { Camera } from 'lucide-react';

interface Profile {
  avatar_url: string | null;
  name: string | null;
  email: string | null;
}

export function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  async function getProfile() {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      
      if (data) {
        setProfile(data);
        setName(data.name || '');
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateProfile() {
    if (!user) return;

    try {
      await supabase
        .from('profiles')
        .upsert({ 
          id: user.id, 
          name,
          updated_at: new Date().toISOString()
        });
        
      getProfile();
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  }

  async function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Você deve selecionar uma imagem para upload.');
      }

      const file = event.target.files[0];
      if (!user?.id) throw new Error('Usuário não encontrado');

      const avatarUrl = await uploadAvatar(file, user.id);
      setProfile(prev => prev ? { ...prev, avatar_url: avatarUrl } : null);
    } catch (error) {
      console.error('Erro ao atualizar avatar:', error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <Layout>
      <div className="mb-20">
        <h1 className="text-2xl font-bold mb-6">Meu Perfil</h1>

        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={profile?.avatar_url || 'https://via.placeholder.com/150'}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer">
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full p-3 border rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <button
              onClick={updateProfile}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}