import { useEffect, useState, useCallback } from 'react';
import { getSpotifyToken, searchSpotifyTrack } from '../services/spotify';

export function useSpotify() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeSpotify = async () => {
      try {
        setIsLoading(true);
        const accessToken = await getSpotifyToken();
        if (accessToken) {
          setToken(accessToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Erro ao inicializar Spotify:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeSpotify();
  }, []);

  const searchTrack = useCallback(async (query: string) => {
    if (!token) return null;
    try {
      return await searchSpotifyTrack(query, token);
    } catch (error) {
      console.error('Erro ao buscar música:', error);
      return null;
    }
  }, [token]);

  return {
    isAuthenticated,
    token,
    searchTrack,
    isLoading
  };
}