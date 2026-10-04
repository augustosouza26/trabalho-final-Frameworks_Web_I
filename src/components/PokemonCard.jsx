import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { formatPokemonId, formatPokemonName, getPokemonImage } from '../utils/formatPokemon.js';
import PokemonTypeChips from './PokemonTypeChips.jsx';

export default function PokemonCard({ pokemon }) {
  const image = getPokemonImage(pokemon);

  return (
    <Card className="pokemon-card">
      <CardActionArea component={Link} to={`/pokemon/${pokemon.name}`} className="pokemon-card-link">
        <Box className="pokemon-card-art">
          <Typography className="pokemon-card-number" aria-label={`Número ${pokemon.id}`}>
            {formatPokemonId(pokemon.id)}
          </Typography>
          {image ? (
            <Box
              component="img"
              src={image}
              alt={formatPokemonName(pokemon.name)}
              className="pokemon-card-image"
              loading="lazy"
            />
          ) : (
            <Typography color="text.secondary">Imagem indisponível</Typography>
          )}
          <ArrowForwardIcon className="pokemon-card-arrow" aria-hidden="true" />
        </Box>
        <CardContent className="pokemon-card-content">
          <Typography variant="h6" component="h2" className="pokemon-card-name">
            {formatPokemonName(pokemon.name)}
          </Typography>
          <PokemonTypeChips types={pokemon.types} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}