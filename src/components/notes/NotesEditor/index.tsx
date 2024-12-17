```tsx
import { useState } from 'react';
import { Save } from 'lucide-react';
import { useNotes } from '../../../hooks/useNotes';
import { NotesDrawer } from '../NotesDrawer';
import { EditorHeader } from './EditorHeader';
import { EditorTextarea } from './EditorTextarea';

interface NotesEditorProps {
  devotionalDay: number;
}

export function NotesEditor({ devotionalDay }: NotesEditorProps) {
  const { notes, saveNotes, isLoading } = useNotes(devotionalDay);
  const [content, setContent] = useState(notes);

  const handleSave = () => {
    saveNotes(content);
  };

  if (isLoading) return null;

  return (
    <div className="relative">
      <div className="p-4">
        <EditorHeader onSave={handleSave} />
        <EditorTextarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <NotesDrawer devotionalDay={devotionalDay} />
    </div>
  );
}
```