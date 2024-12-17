import { SPOTIFY_CONFIG } from '../constants/spotify';

const { CLIENT_ID, CLIENT_SECRET } = SPOTIFY_CONFIG;

const SPOTIFY_TOKEN_KEY = 'spotify_token';
const SPOTIFY_TOKEN_EXPIRY_KEY = 'spotify_token_expiry';

export async function getSpotifyToken() {
  try {
    // Verifica se já temos um token válido em cache
    const cachedToken = localStorage.getItem(SPOTIFY_TOKEN_KEY);
    const tokenExpiry = localStorage.getItem(SPOTIFY_TOKEN_EXPIRY_KEY);
    
    if (cachedToken && tokenExpiry && Date.now() < Number(tokenExpiry)) {
      return cachedToken;
    }

    // Se não tiver token válido, solicita um novo
    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Salva o token e sua expiração
    localStorage.setItem(SPOTIFY_TOKEN_KEY, data.access_token);
    localStorage.setItem(SPOTIFY_TOKEN_EXPIRY_KEY, String(Date.now() + (data.expires_in * 1000)));
    
    return data.access_token;
  } catch (error) {
    console.error('Erro ao obter token do Spotify:', error);
    return null;
  }
}

export async function searchSpotifyTrack(query: string, token: string) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&market=BR&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.tracks?.items[0] || null;
  } catch (error) {
    console.error('Erro na busca do Spotify:', error);
    return null;
  }
}