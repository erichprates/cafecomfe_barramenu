import { Routes, Route } from 'react-router-dom';
import { DevotionalPage } from '../pages/DevotionalPage';
import { AuthPage } from '../pages/AuthPage';
import { NotesPage } from '../pages/NotesPage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { PrayersPage } from '../pages/PrayersPage';
import { ProfilePage } from '../pages/ProfilePage';
import { PrivateRoute } from './PrivateRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={
        <PrivateRoute>
          <DevotionalPage />
        </PrivateRoute>
      } />
      <Route path="/notes" element={
        <PrivateRoute>
          <NotesPage />
        </PrivateRoute>
      } />
      <Route path="/favorites" element={
        <PrivateRoute>
          <FavoritesPage />
        </PrivateRoute>
      } />
      <Route path="/prayers" element={
        <PrivateRoute>
          <PrayersPage />
        </PrivateRoute>
      } />
      <Route path="/profile" element={
        <PrivateRoute>
          <ProfilePage />
        </PrivateRoute>
      } />
    </Routes>
  );
}