import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Layout } from '../components/layout';
import { formatDateTime } from '../utils/formatters';
import { useNotes } from '../hooks/useNotes';

export function NotesHistoryPage() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const { notesHistory } = useNotes(selectedDay || 1);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar ao devocional</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Histórico de Anotações
          </h1>
        </div>

        <div className="space-y-6">
          {notesHistory.map((note) => (
            <div
              key={note.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{formatDateTime(note.created_at)}</span>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                  {note.content}
                </p>
              </div>

              <button
                onClick={() => navigate(`/?day=${note.devotional_day}`)}
                className="mt-4 text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Ver devocional deste dia
              </button>
            </div>
          ))}

          {notesHistory.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              Nenhuma anotação encontrada
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}