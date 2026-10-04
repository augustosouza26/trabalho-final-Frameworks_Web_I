import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0} className="site-header">
      <Container maxWidth="lg">
        <Toolbar disableGutters className="header-toolbar">
          <Box component={Link} to="/" className="brand-link" aria-label="Ir para a Pokédex">
            <Box className="brand-mark" aria-hidden="true">
              <CatchingPokemonIcon />
            </Box>
            <Typography component="span" variant="h6" className="brand-name">
              Pokédex
            </Typography>
          </Box>
          <Typography variant="body2" className="header-caption">
            Explore o mundo Pokémon
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}