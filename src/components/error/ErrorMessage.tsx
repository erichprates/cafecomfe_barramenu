interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-red-500">Erro ao carregar devocional: {message}</div>
    </div>
  );
}