import { useState } from 'react';
import { useNotes } from '../../../hooks/useNotes';
import { DrawerContent } from './DrawerContent';
import { FloatingButton } from './FloatingButton';

interface NotesDrawerProps {
  devotionalDay: number;
}

export function NotesDrawer({ devotionalDay }: NotesDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { notesHistory } = useNotes(devotionalDay);

  return (
    <>
      <FloatingButton onClick={() => setIsOpen(true)} />
      <DrawerContent
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        notesHistory={notesHistory}
      />
    </>
  );
}