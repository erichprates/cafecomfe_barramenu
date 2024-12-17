import { BookOpen, Heart, Home, MessageCircle, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function BottomNav() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="max-w-3xl mx-auto flex items-center justify-around h-16">
        <Link 
          to="/notes" 
          className={`flex flex-col items-center ${
            isActive('/notes') ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-xs mt-1">Anotações</span>
        </Link>
        
        <Link 
          to="/favorites" 
          className={`flex flex-col items-center ${
            isActive('/favorites') ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <Heart className="w-6 h-6" />
          <span className="text-xs mt-1">Favoritos</span>
        </Link>
        
        <Link 
          to="/" 
          className={`flex flex-col items-center ${
            isActive('/') ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <div className="relative -top-4 p-3 rounded-full bg-blue-500 text-white shadow-lg">
            <Home className="w-6 h-6" />
          </div>
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link 
          to="/prayers" 
          className={`flex flex-col items-center ${
            isActive('/prayers') ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs mt-1">Orações</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center ${
            isActive('/profile') ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Perfil</span>
        </Link>
      </div>
    </nav>
  );
}