import { Box } from '@mui/material';
import ErrorMessage from './ErrorMessage.jsx';
import Loading from './Loading.jsx';
import PokemonCard from './PokemonCard.jsx';

export default function PokemonList({ pokemon, loading, error, onRetry }) {
  if (loading) return <Loading message="Carregando Pokémon..." />;
  if (error) return <ErrorMessage message={error} onRetry={onRetry} />;

  return (
    <Box className="pokemon-grid">
      {pokemon.map((item) => <PokemonCard key={item.id} pokemon={item} />)}
    </Box>
  );
}