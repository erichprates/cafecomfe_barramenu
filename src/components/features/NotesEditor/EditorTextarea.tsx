interface EditorTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function EditorTextarea({ value, onChange }: EditorTextareaProps) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className="w-full h-32 p-2 border rounded-md bg-white dark:bg-gray-800 
               border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200
               focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
               focus:border-transparent resize-none"
      placeholder="Faça suas anotações aqui..."
    />
  );
}