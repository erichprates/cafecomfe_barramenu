import { getSpotifyToken, searchSpotifyTrack } from '../services/spotify';

export async function checkAndUpdateSpotifyUrls() {
  const token = await getSpotifyToken();
  if (!token) {
    console.error('Não foi possível obter token do Spotify');
    return;
  }

  const { data: devotionals, error } = await supabase
    .from('devotionals')
    .select('*')
    .order('day');

  if (error) {
    console.error('Erro ao buscar devocionais:', error);
    return;
  }

  for (const devotional of devotionals) {
    try {
      const track = await searchSpotifyTrack(
        `${devotional.song_title} ${devotional.song_artist}`,
        token
      );

      if (track?.album?.images[0]?.url) {
        const { error: updateError } = await supabase
          .from('devotionals')
          .update({ song_cover_url: track.album.images[0].url })
          .eq('day', devotional.day);

        if (updateError) {
          console.error(`Erro ao atualizar devocional ${devotional.day}:`, updateError);
        } else {
          console.log(`Devocional ${devotional.day} atualizado com sucesso!`);
          console.log('Nova URL:', track.album.images[0].url);
        }
      }
    } catch (err) {
      console.error(`Erro ao processar devocional ${devotional.day}:`, err);
    }

    // Aguarda 1 segundo entre as requisições para evitar limites da API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}