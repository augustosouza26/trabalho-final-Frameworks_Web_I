import { Alert, Button, Stack } from '@mui/material';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <Stack spacing={1.5} alignItems="flex-start" className="error-state">
      <Alert severity="error" sx={{ width: '100%' }}>{message}</Alert>
      {onRetry && (
        <Button variant="outlined" color="primary" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </Stack>
  );
}