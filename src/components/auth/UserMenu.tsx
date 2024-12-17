import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function UserMenu() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <span className="text-sm text-gray-700 dark:text-gray-200">
          {user.email}
        </span>
      </div>
      <button
        onClick={handleLogout}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="Sair"
      >
        <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
    </div>
  );
}