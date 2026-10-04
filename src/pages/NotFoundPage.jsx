import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Container maxWidth="sm" className="page-container not-found-page">
      <Typography className="eyebrow">ERRO 404</Typography>
      <Typography variant="h1" className="page-title">Página não encontrada</Typography>
      <Typography color="text.secondary" sx={{ mt: 1.5 }}>
        Este caminho não faz parte da Pokédex.
      </Typography>
      <Button component={Link} to="/" variant="contained" sx={{ mt: 3 }}>
        Voltar ao início
      </Button>
    </Container>
  );
}