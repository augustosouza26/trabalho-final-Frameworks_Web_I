import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';

export default function SearchBar({ value, onChange }) {
  return (
    <TextField
      fullWidth
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Buscar pelo nome..."
      inputProps={{ 'aria-label': 'Buscar Pokémon pelo nome' }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
      sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'background.paper' } }}
    />
  );
}