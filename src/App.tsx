import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes';
import { BottomNav } from './components/BottomNav';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            <AppRoutes />
          </div>
          {!isAuthPage && <BottomNav />}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;