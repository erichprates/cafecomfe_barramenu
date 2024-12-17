import { useState } from 'react';
import { X, Edit2, Trash2, Save } from 'lucide-react';
import { useNotes } from '../../../hooks/useNotes';
import { formatDateTime } from '../../../utils/formatters';
import type { Note } from '../../../types/notes';

interface NotesModalProps {
  notes: Note[];
  devotionalTitle: string;
  onClose: () => void;
}

export function NotesModal({ notes, devotionalTitle, onClose }: NotesModalProps) {
  const { updateNote, deleteNote } = useNotes(notes[0]?.devotional_day);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showTopAlert = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleEdit = (note: Note) => {
    setEditingNoteId(note.id);
    setEditContent(note.content);
  };

  const handleSave = async (noteId: number) => {
    if (!editContent.trim()) {
      showTopAlert('O conteúdo da nota não pode estar vazio.');
      return;
    }

    const success = await updateNote(noteId, editContent);
    if (success) {
      setEditingNoteId(null);
      showTopAlert('Nota atualizada com sucesso!');
    }
  };

  const handleDelete = async (noteId: number) => {
    if (await deleteNote(noteId)) {
      setShowDeleteConfirm(null);
      showTopAlert('Nota excluída com sucesso!');
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Modal Content */}
      <div className="fixed inset-4 bg-[#ffffd4] dark:bg-[#2c2c1f] rounded-lg shadow-xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-300 dark:border-gray-600 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {devotionalTitle}
          </h3>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            {notes.map((note) => (
              <div key={note.id} className="bg-[#ffffd4] rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="inline-block bg-[#b1e581] text-xs px-2 py-1 rounded">
                    {formatDateTime(note.created_at)}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(note)}
                      className="flex items-center gap-1 text-sm"
                    >
                      <Edit2 className="w-4 h-4" /> Editar
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(note.id)}
                      className="flex items-center gap-1 text-sm"
                    >
                      <Trash2 className="w-4 h-4" /> Apagar
                    </button>
                  </div>
                </div>

                {editingNoteId === note.id ? (
                  <div>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0 text-gray-800 resize-none"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #ccc 31px, #ccc 32px)',
                        lineHeight: '32px',
                        padding: '8px 0',
                        minHeight: '128px'
                      }}
                    />
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => handleSave(note.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        <Save className="w-4 h-4" />
                        <span>Salvar alterações</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="whitespace-pre-wrap"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #ccc 31px, #ccc 32px)',
                      lineHeight: '32px',
                      padding: '8px 0',
                      minHeight: '128px'
                    }}
                  >
                    {note.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmação de exclusão */}
      {showDeleteConfirm && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-4 flex items-center justify-between z-50">
          <p>Tem certeza que deseja excluir esta anotação?</p>
          <div className="flex gap-4">
            <button
              onClick={() => setShowDeleteConfirm(null)}
              className="px-4 py-1 bg-red-600 rounded hover:bg-red-700"
            >
              Cancelar
            </button>
            <button
              onClick={() => handleDelete(showDeleteConfirm)}
              className="px-4 py-1 bg-red-600 rounded hover:bg-red-700"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}

      {/* Alerta de sucesso/erro */}
      {showAlert && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white p-4 text-center z-50">
          {alertMessage}
        </div>
      )}
    </div>
  );
}