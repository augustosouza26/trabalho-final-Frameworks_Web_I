import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 15000,
});

export const pokemonApi = {
  async getPokemonList(limit = 2000, offset = 0) {
    const response = await apiClient.get('/pokemon', { params: { limit, offset } });
    return response.data.results;
  },

  async getPokemonTypes() {
    const response = await apiClient.get('/type', { params: { limit: 100 } });
    return response.data.results;
  },

  async getPokemonNamesByType(type) {
    const response = await apiClient.get(`/type/${encodeURIComponent(type)}`);
    return response.data.pokemon.map(({ pokemon }) => pokemon.name);
  },

  async getPokemon(identifier) {
    const response = await apiClient.get(`/pokemon/${encodeURIComponent(identifier)}`);
    return response.data;
  },
};