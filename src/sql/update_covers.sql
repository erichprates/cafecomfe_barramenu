-- Atualizar as URLs das capas dos álbuns com URLs válidas
update devotionals
set song_cover_url = case day
  when 1 then 'https://i.scdn.co/image/ab67616d0000b273c1d1a58a7d80872829373e21' -- Aline Barros
  when 2 then 'https://i.scdn.co/image/ab67616d0000b273d41b1a6ca4a4c0d75257d742' -- Mariana Valadão
  when 3 then 'https://i.scdn.co/image/ab67616d0000b2735c5eaf5b1fb99da9ef614e4b' -- Comunidade da Graça
  when 4 then 'https://i.scdn.co/image/ab67616d0000b273c0f3c4e89484b1697c525c0c' -- Nívea Soares
  when 5 then 'https://i.scdn.co/image/ab67616d0000b273e0de775e8c5e9d2b8a5bb05b' -- André Valadão
  when 6 then 'https://i.scdn.co/image/ab67616d0000b273b5db9faf4a43a844059c5d6e' -- Fernandinho
  when 7 then 'https://i.scdn.co/image/ab67616d0000b273f9c96e6f8669fa4e44c4695c' -- Diante do Trono
  when 8 then 'https://i.scdn.co/image/ab67616d0000b273b8d04a9f6c1c6a1e1a2c4789' -- Cassiane
  when 9 then 'https://i.scdn.co/image/ab67616d0000b273d8f8f55847a2abdb41d4e3e5' -- Eli Soares
  when 10 then 'https://i.scdn.co/image/ab67616d0000b273a0f30d5197a5671c23df5583' -- Leonardo Gonçalves
end
where day between 1 and 10;