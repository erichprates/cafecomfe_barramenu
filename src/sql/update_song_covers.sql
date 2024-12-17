-- Atualizar as URLs das capas dos álbuns com URLs válidas do Spotify
update devotionals
set song_cover_url = case day
  when 1 then 'https://i.scdn.co/image/ab67616d0000b273e8f69ab4e1d74bf4e34785b6' -- Autor da Minha Fé - Aline Barros
  when 2 then 'https://i.scdn.co/image/ab67616d0000b273d41b1a6ca4a4c0d75257d742' -- Tu És Fiel - Mariana Valadão
  when 3 then 'https://i.scdn.co/image/ab67616d0000b2735c5eaf5b1fb99da9ef614e4b' -- Sou Família de Deus - Comunidade da Graça
  when 4 then 'https://i.scdn.co/image/ab67616d0000b273c0f3c4e89484b1697c525c0c' -- Mais Parecido com Cristo - Nívea Soares
  when 5 then 'https://i.scdn.co/image/ab67616d0000b273e0de775e8c5e9d2b8a5bb05b' -- Servo de Deus - André Valadão
  when 6 then 'https://i.scdn.co/image/ab67616d0000b273b5db9faf4a43a844059c5d6e' -- A Missão - Fernandinho
  when 7 then 'https://i.scdn.co/image/ab67616d0000b273f9c96e6f8669fa4e44c4695c' -- Nosso Refúgio - Diante do Trono
  when 8 then 'https://i.scdn.co/image/ab67616d0000b273b8d04a9f6c1c6a1e1a2c4789' -- Firmes na Fé - Cassiane
  when 9 then 'https://i.scdn.co/image/ab67616d0000b273d8f8f55847a2abdb41d4e3e5' -- Sabedoria do Alto - Eli Soares
  when 10 then 'https://i.scdn.co/image/ab67616d0000b273a0f30d5197a5671c23df5583' -- Descansarei - Leonardo Gonçalves
end
where day between 1 and 10;