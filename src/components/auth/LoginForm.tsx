import { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    try {
      const errorMessage = await signIn(email, password);
      if (errorMessage) {
        setError(errorMessage);
      }
    } catch (err: any) {
      setError('Ocorreu um erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Entrar</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
            {success}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="seu@email.com"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="********"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md 
                   flex items-center justify-center gap-2 transition-colors
                   ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <LogIn className="w-5 h-5" />
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}