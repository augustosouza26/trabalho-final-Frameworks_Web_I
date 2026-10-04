export function formatPokemonName(name = '') {
  return name
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function formatPokemonId(id) {
  return `#${String(id).padStart(4, '0')}`;
}

export function getPokemonImage(pokemon) {
  return (
    pokemon?.sprites?.other?.['official-artwork']?.front_default ||
    pokemon?.sprites?.front_default ||
    ''
  );
}