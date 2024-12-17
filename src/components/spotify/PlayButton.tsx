import { ExternalLink } from 'lucide-react';

interface PlayButtonProps {
  onClick: () => void;
}

export function PlayButton({ onClick }: PlayButtonProps) {
  return (
    <button
      className="p-3 rounded-full bg-[#1DB954] text-white hover:bg-[#1ed760] transition-colors"
      onClick={onClick}
      aria-label="Abrir no Spotify"
    >
      <ExternalLink className="w-5 h-5" />
    </button>
  );
}