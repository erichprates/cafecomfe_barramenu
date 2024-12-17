import { LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function LoginButton() {
  const { signIn } = useAuth();

  return (
    <button
      onClick={() => signIn()}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg 
                 hover:bg-blue-600 transition-colors"
    >
      <LogIn className="w-4 h-4" />
      <span>Entrar com Google</span>
    </button>
  );
}