import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function TypeFilter({ types, value, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="pokemon-type-label">Tipo</InputLabel>
      <Select
        labelId="pokemon-type-label"
        id="pokemon-type"
        value={value}
        label="Tipo"
        onChange={(event) => onChange(event.target.value)}
        sx={{ backgroundColor: 'background.paper' }}
      >
        <MenuItem value="">Todos os tipos</MenuItem>
        {types.map(({ name }) => (
          <MenuItem key={name} value={name} sx={{ textTransform: 'capitalize' }}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}