import { useState } from 'react';
import { Save } from 'lucide-react';
import { useNotes } from '../../../hooks/useNotes';
import { NotesDrawer } from '../../notes/NotesDrawer';
import { GroupedNotesList } from './GroupedNotesList';
import { NotesModal } from './NotesModal';

interface NotesEditorProps {
  devotionalDay: number;
  devotionalTitle: string;
  showList?: boolean;
  showEditor?: boolean;
}

export function NotesEditor({ 
  devotionalDay, 
  devotionalTitle,
  showList = false,
  showEditor = true
}: NotesEditorProps) {
  const { saveNotes, allNotes, isLoading } = useNotes(devotionalDay);
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleSave = async () => {
    if (!content.trim()) {
      alert('Por favor, escreva algo antes de salvar.');
      return;
    }
    
    const success = await saveNotes(content);
    if (success) {
      setContent('');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleOpenModal = (day: number) => {
    setSelectedDay(day);
    setShowModal(true);
  };

  if (isLoading) return null;

  return (
    <div className="space-y-6">
      {/* Alerta de sucesso */}
      {showAlert && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          Nota salva com sucesso!
        </div>
      )}

      {showEditor && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Fazer anotação
            </h3>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Salvar</span>
            </button>
          </div>
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-32 p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 
                     border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                     focus:border-transparent resize-none"
            placeholder="Escreva sua anotação aqui..."
          />
        </div>
      )}

      {showList && allNotes.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg">
          <div className="space-y-2">
            {Object.entries(
              allNotes.reduce((acc, note) => {
                const day = note.devotional_day;
                if (!acc[day]) {
                  acc[day] = {
                    notes: [],
                    title: (note as any).devotionals?.title || 'Devocional',
                    day
                  };
                }
                acc[day].notes.push(note);
                return acc;
              }, {} as Record<number, { notes: typeof allNotes; title: string; day: number }>)
            ).map(([_, group]) => (
              <GroupedNotesList
                key={group.day}
                notes={group.notes}
                title={group.title}
                onOpenModal={() => handleOpenModal(group.day)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modal de notas */}
      {showModal && selectedDay && (
        <NotesModal
          notes={allNotes.filter(note => note.devotional_day === selectedDay)}
          devotionalTitle={allNotes.find(note => note.devotional_day === selectedDay)?.devotionals?.title || 'Devocional'}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}