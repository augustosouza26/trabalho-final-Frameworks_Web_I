import { useEffect, useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Loading from '../components/Loading.jsx';
import PaginationControls from '../components/PaginationControls.jsx';
import PokemonList from '../components/PokemonList.jsx';
import SearchBar from '../components/SearchBar.jsx';
import TypeFilter from '../components/TypeFilter.jsx';
import { pokemonApi } from '../services/api.js';

const PAGE_SIZE = 24;

export default function PokedexPage() {
  const [catalog, setCatalog] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [typeData, setTypeData] = useState({ type: '', names: null });
  const [page, setPage] = useState(1);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [pokemon, setPokemon] = useState([]);
  const [pokemonLoading, setPokemonLoading] = useState(false);
  const [pokemonError, setPokemonError] = useState('');
  const [catalogRetry, setCatalogRetry] = useState(0);
  const [typeRetry, setTypeRetry] = useState(0);
  const [pokemonRetry, setPokemonRetry] = useState(0);

  useEffect(() => {
    let isCurrent = true;
    setCatalogLoading(true);
    setCatalogError('');

    Promise.all([pokemonApi.getPokemonList(), pokemonApi.getPokemonTypes()])
      .then(([pokemonList, pokemonTypes]) => {
        if (!isCurrent) return;
        setCatalog(pokemonList);
        setTypes(pokemonTypes.filter(({ name }) => !['unknown', 'shadow'].includes(name)));
      })
      .catch(() => {
        if (isCurrent) setCatalogError('Não foi possível carregar os Pokémon. Tente novamente.');
      })
      .finally(() => {
        if (isCurrent) setCatalogLoading(false);
      });

    return () => { isCurrent = false; };
  }, [catalogRetry]);

  useEffect(() => {
    if (!selectedType) {
      setTypeData({ type: '', names: null });
      setTypeError('');
      return undefined;
    }

    let isCurrent = true;
    setTypeData({ type: selectedType, names: null });
    setTypeError('');

    pokemonApi.getPokemonNamesByType(selectedType)
      .then((names) => {
        if (isCurrent) setTypeData({ type: selectedType, names: new Set(names) });
      })
      .catch(() => {
        if (isCurrent) setTypeError('Não foi possível carregar esse tipo. Tente novamente.');
      });

    return () => { isCurrent = false; };
  }, [selectedType, typeRetry]);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const waitingForType = Boolean(selectedType)
    && (typeData.type !== selectedType || typeData.names === null)
    && !typeError;
  const typeNames = typeData.type === selectedType ? typeData.names : null;
  const filteredCatalog = catalog.filter(({ name }) => {
    const matchesSearch = name.toLowerCase().includes(normalizedSearch);
    const matchesType = !selectedType || (typeNames && typeNames.has(name));
    return matchesSearch && matchesType;
  });
  const pageCount = Math.max(1, Math.ceil(filteredCatalog.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visibleNamesKey = filteredCatalog
    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    .map(({ name }) => name)
    .join('|');

  useEffect(() => {
    const names = visibleNamesKey ? visibleNamesKey.split('|') : [];
    if (waitingForType || typeError) return undefined;
    if (names.length === 0) {
      setPokemon([]);
      setPokemonLoading(false);
      setPokemonError('');
      return undefined;
    }

    let isCurrent = true;
    setPokemonLoading(true);
    setPokemonError('');

    Promise.all(names.map((name) => pokemonApi.getPokemon(name)))
      .then((details) => {
        if (isCurrent) setPokemon(details);
      })
      .catch(() => {
        if (isCurrent) setPokemonError('Não foi possível carregar os Pokémon. Tente novamente.');
      })
      .finally(() => {
        if (isCurrent) setPokemonLoading(false);
      });

    return () => { isCurrent = false; };
  }, [visibleNamesKey, waitingForType, typeError, pokemonRetry]);

  function handleSearchChange(value) {
    setSearchTerm(value);
    setPage(1);
  }

  function handleTypeChange(value) {
    setSelectedType(value);
    setPage(1);
  }

  function clearFilters() {
    setSearchTerm('');
    setSelectedType('');
    setPage(1);
  }

  const hasActiveFilters = Boolean(searchTerm || selectedType);

  return (
    <main>
      <Container maxWidth="lg" className="page-container">
        <Box className="page-intro">
          <Typography className="eyebrow">ENCICLOPÉDIA POKÉMON</Typography>
          <Typography variant="h1" className="page-title">Encontre seu próximo parceiro.</Typography>
          <Typography color="text.secondary" className="page-description">
            Explore espécies, compare tipos e descubra o que torna cada Pokémon único.
          </Typography>
        </Box>

        <Box className="filter-panel" component="section" aria-label="Busca e filtros">
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <SearchBar value={searchTerm} onChange={handleSearchChange} />
            <Box className="type-filter-control">
              <TypeFilter types={types} value={selectedType} onChange={handleTypeChange} />
            </Box>
          </Stack>
        </Box>

        <Box className="results-heading">
          <Typography variant="h5" component="h2">Pokémon</Typography>
          {!catalogLoading && !catalogError && !waitingForType && !typeError && (
            <Typography variant="body2" color="text.secondary">
              {filteredCatalog.length} {filteredCatalog.length === 1 ? 'resultado' : 'resultados'}
            </Typography>
          )}
        </Box>

        {catalogLoading ? (
          <Loading message="Preparando a Pokédex..." />
        ) : catalogError ? (
          <ErrorMessage message={catalogError} onRetry={() => setCatalogRetry((value) => value + 1)} />
        ) : waitingForType ? (
          <Loading message="Carregando Pokémon desse tipo..." />
        ) : typeError ? (
          <ErrorMessage message={typeError} onRetry={() => setTypeRetry((value) => value + 1)} />
        ) : filteredCatalog.length === 0 ? (
          <Box className="empty-state">
            <Typography variant="h6">Nenhum Pokémon encontrado</Typography>
            <Typography color="text.secondary">Tente outro nome ou remova um dos filtros.</Typography>
            {hasActiveFilters && (
              <Button onClick={clearFilters} startIcon={<RestartAltIcon />}>
                Limpar filtros
              </Button>
            )}
          </Box>
        ) : (
          <>
            <PokemonList
              pokemon={pokemon}
              loading={pokemonLoading}
              error={pokemonError}
              onRetry={() => setPokemonRetry((value) => value + 1)}
            />
            <PaginationControls page={currentPage} pageCount={pageCount} onChange={setPage} />
          </>
        )}
      </Container>
    </main>
  );
}