import { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Chip, Container, LinearProgress, Stack, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Loading from '../components/Loading.jsx';
import PokemonTypeChips from '../components/PokemonTypeChips.jsx';
import { pokemonApi } from '../services/api.js';
import { formatPokemonId, formatPokemonName, getPokemonImage } from '../utils/formatPokemon.js';

const statLabels = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Special Attack',
  'special-defense': 'Special Defense',
  speed: 'Speed',
};

export default function PokemonDetailsPage() {
  const { identifier } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let isCurrent = true;
    setLoading(true);
    setError('');

    pokemonApi.getPokemon(identifier)
      .then((result) => {
        if (isCurrent) setPokemon(result);
      })
      .catch(() => {
        if (isCurrent) setError('Não foi possível carregar esse Pokémon. Verifique o endereço e tente novamente.');
      })
      .finally(() => {
        if (isCurrent) setLoading(false);
      });

    return () => { isCurrent = false; };
  }, [identifier, retry]);

  if (loading) {
    return <Container maxWidth="md" className="page-container"><Loading message="Carregando detalhes..." /></Container>;
  }

  if (error || !pokemon) {
    return (
      <Container maxWidth="md" className="page-container detail-error-page">
        <ErrorMessage
          message={error || 'Não foi possível carregar esse Pokémon.'}
          onRetry={() => setRetry((value) => value + 1)}
        />
        <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
          Voltar à Pokédex
        </Button>
      </Container>
    );
  }

  const image = getPokemonImage(pokemon);

  return (
    <main>
      <Container maxWidth="md" className="page-container detail-page">
        <Button component={Link} to="/" startIcon={<ArrowBackIcon />} className="back-button">
          Voltar à Pokédex
        </Button>
        <Box className="detail-layout">
          <Box className="detail-hero">
            <Typography className="detail-number">{formatPokemonId(pokemon.id)}</Typography>
            {image ? (
              <Box component="img" src={image} alt={formatPokemonName(pokemon.name)} className="detail-image" />
            ) : (
              <Typography color="text.secondary">Imagem indisponível</Typography>
            )}
          </Box>

          <Box className="detail-content">
            <Typography className="eyebrow">FICHA DO POKÉMON</Typography>
            <Typography variant="h1" className="detail-title">{formatPokemonName(pokemon.name)}</Typography>
            <PokemonTypeChips types={pokemon.types} size="medium" />

            <Stack direction="row" spacing={1.5} className="measurements">
              <Chip label={`Altura · ${(pokemon.height / 10).toFixed(1)} m`} variant="outlined" />
              <Chip label={`Peso · ${(pokemon.weight / 10).toFixed(1)} kg`} variant="outlined" />
            </Stack>

            <Box className="detail-section">
              <Typography variant="h6" component="h2">Habilidades</Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 1.25 }}>
                {pokemon.abilities.map(({ ability, is_hidden: isHidden }) => (
                  <Chip
                    key={ability.name}
                    label={`${formatPokemonName(ability.name)}${isHidden ? ' · oculta' : ''}`}
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Box>

            <Box className="detail-section">
              <Typography variant="h6" component="h2">Estatísticas base</Typography>
              <Stack spacing={1.6} sx={{ mt: 1.75 }}>
                {pokemon.stats.map(({ base_stat: baseStat, stat }) => (
                  <Box key={stat.name} className="stat-row">
                    <Typography variant="body2" className="stat-label">
                      {statLabels[stat.name] || formatPokemonName(stat.name)}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min((baseStat / 255) * 100, 100)}
                      aria-label={`${statLabels[stat.name] || stat.name}: ${baseStat}`}
                      className="stat-progress"
                    />
                    <Typography variant="body2" className="stat-value">{baseStat}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>
    </main>
  );
}