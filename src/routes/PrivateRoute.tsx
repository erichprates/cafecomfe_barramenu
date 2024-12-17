import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/loading/LoadingSpinner';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}