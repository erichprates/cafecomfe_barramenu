import { Home, Book, Heart, PenSquare, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-gray-900' : 'text-gray-600';
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-[9999]">
      <div className="flex justify-between items-center h-16 max-w-lg mx-auto px-6 relative">
        <Link to="/notes" className={`flex items-center ${isActive('/notes')}`}>
          <PenSquare size={24} />
        </Link>
        
        <Link to="/favorites" className={`flex items-center ${isActive('/favorites')} absolute left-[25%]`}>
          <Heart size={24} />
        </Link>

        <Link to="/" className="flex items-center absolute -top-8 left-1/2 -translate-x-1/2">
          <div className={`p-4 rounded-full shadow-lg ${location.pathname === '/' ? 'bg-gray-200' : 'bg-blue-500'}`}>
            <Home 
              size={32} 
              className={location.pathname === '/' ? 'text-gray-900' : 'text-white'}
            />
          </div>
        </Link>
        
        <Link to="/prayers" className={`flex items-center ${isActive('/prayers')} absolute right-[25%]`}>
          <Book size={24} />
        </Link>
        
        <Link to="/profile" className={`flex items-center ${isActive('/profile')}`}>
          <User size={24} />
        </Link>
      </div>
    </nav>
  );
} 