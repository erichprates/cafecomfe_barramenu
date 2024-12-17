declare namespace SpotifyApi {
  interface TrackObjectFull {
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      release_date: string;
      images: Array<{ url: string }>;
    };
    duration_ms: number;
    external_urls: {
      spotify: string;
    };
  }
}

interface Window {
  Spotify: {
    Player: new (options: {
      name: string;
      getOAuthToken: (cb: (token: string) => void) => void;
      volume: number;
    }) => any;
  };
  onSpotifyWebPlaybackSDKReady: () => void;
}