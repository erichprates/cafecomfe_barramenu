import { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LoginButton } from './LoginButton';

interface AuthRequiredProps {
  children: ReactNode;
}

export function AuthRequired({ children }: AuthRequiredProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (!user) {
    return (
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Faça login para acessar este recurso
        </p>
        <LoginButton />
      </div>
    );
  }

  return <>{children}</>;
}