import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading({ message = 'Carregando...' }) {
  return (
    <Box className="loading-state" role="status" aria-live="polite">
      <CircularProgress size={34} thickness={4} />
      <Typography color="text.secondary">{message}</Typography>
    </Box>
  );
}