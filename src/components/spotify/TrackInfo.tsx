import { formatDate, formatDuration } from '../../utils/formatters';

interface TrackInfoProps {
  track: SpotifyApi.TrackObjectFull;
}

export function TrackInfo({ track }: TrackInfoProps) {
  return (
    <div className="flex-1">
      <h3 className="text-3xl font-bold mb-2">{track.name}</h3>
      <p className="text-sm text-gray-400">
        {track.artists[0].name} • {track.album.name} • {formatDate(track.album.release_date)} • {formatDuration(track.duration_ms)}
      </p>
    </div>
  );
}