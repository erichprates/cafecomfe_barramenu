import { useState } from 'react';
import { Save } from 'lucide-react';

interface NoteFormProps {
  onSave: (content: string) => Promise<void>;
}

export function NoteForm({ onSave }: NoteFormProps) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('Por favor, escreva algo antes de salvar.');
      return;
    }
    
    await onSave(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-32 p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 
                 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200
                 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                 focus:border-transparent resize-none"
        placeholder="Escreva sua anotação aqui..."
      />
      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <Save className="w-4 h-4" />
        <span>Salvar</span>
      </button>
    </form>
  );
}