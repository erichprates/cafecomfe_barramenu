import { useState, useEffect } from 'react';
import { Layout } from '../components/layout';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { PlusCircle } from 'lucide-react';

interface Prayer {
  id: number;
  user_id: string;
  content: string;
  created_at: string;
  user_email: string;
}

export function PrayersPage() {
  const { user } = useAuth();
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [newPrayer, setNewPrayer] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPrayers();
  }, []);

  async function loadPrayers() {
    try {
      const { data } = await supabase
        .from('prayers')
        .select('*, s(email)')
        .order('created_at', { ascending: false });
        
      setPrayers(data || []);
    } catch (error) {
      console.error('Erro ao carregar orações:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !newPrayer.trim()) return;

    try {
      await supabase
        .from('prayers')
        .insert([{ user_id: user.id, content: newPrayer }]);
        
      setNewPrayer('');
      loadPrayers();
    } catch (error) {
      console.error('Erro ao salvar oração:', error);
    }
  }

  return (
    <Layout>
      <div className="mb-20">
        <h1 className="text-2xl font-bold mb-6">Pedidos de Oração</h1>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2">
            <textarea
              value={newPrayer}
              onChange={(e) => setNewPrayer(e.target.value)}
              className="flex-1 p-3 border rounded-lg resize-none"
              placeholder="Digite seu pedido de oração..."
              rows={3}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            >
              <PlusCircle className="w-6 h-6" />
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {prayers.map((prayer) => (
            <div 
              key={prayer.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
            >
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                {prayer.user_email}
              </p>
              <p className="whitespace-pre-wrap">{prayer.content}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}