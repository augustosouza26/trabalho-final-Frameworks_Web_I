import { Box, Pagination, Typography } from '@mui/material';

export default function PaginationControls({ page, pageCount, onChange }) {
  if (pageCount <= 1) return null;

  return (
    <Box className="pagination-row">
      <Typography variant="body2" color="text.secondary">
        Página {page} de {pageCount}
      </Typography>
      <Pagination
        count={pageCount}
        page={page}
        onChange={(_, nextPage) => onChange(nextPage)}
        color="primary"
        shape="rounded"
        siblingCount={0}
        aria-label="Paginação de Pokémon"
      />
    </Box>
  );
}