import { Chip, Stack } from '@mui/material';

const typeColors = {
  normal: ['#e9e8d5', '#514f3f'],
  fire: ['#ffe0d2', '#a84224'],
  water: ['#d9ebff', '#245b9a'],
  electric: ['#fff1bd', '#806000'],
  grass: ['#dcefd8', '#376b36'],
  ice: ['#d8f2ef', '#34746d'],
  fighting: ['#f6d9d9', '#8b3535'],
  poison: ['#ebdef1', '#70437e'],
  ground: ['#f1e2c7', '#795a2e'],
  flying: ['#e4e5f7', '#555d91'],
  psychic: ['#f7dce8', '#983b65'],
  bug: ['#e8edca', '#5b692b'],
  rock: ['#e7e0cf', '#6c6148'],
  ghost: ['#e3def0', '#594d7d'],
  dragon: ['#dedcf6', '#51478f'],
  dark: ['#dedbd8', '#4d4945'],
  steel: ['#e0e7eb', '#4d606b'],
  fairy: ['#f8dfe7', '#914d65'],
};

export default function PokemonTypeChips({ types = [], size = 'small' }) {
  return (
    <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
      {types.map((type) => {
        const name = typeof type === 'string' ? type : type.type.name;
        const [background, foreground] = typeColors[name] || ['#e8ebe6', '#47534b'];

        return (
          <Chip
            key={name}
            label={name}
            size={size}
            sx={{
              backgroundColor: background,
              color: foreground,
              fontWeight: 700,
              textTransform: 'capitalize',
              '& .MuiChip-label': { px: 1.25 },
            }}
          />
        );
      })}
    </Stack>
  );
}