import axios from 'axios';

axios.defaults.baseURL = 'https://pokeapi.co/api/v2/pokemon/';

export const getPokemonList = async (offset, limit) => {
  const response = await axios.get(`?offset=${offset}&limit=${limit}`);
  return response.data;
};

export const getDetails = async id => {
  const response = await axios.get(`${id}`);
  return response.data;
};
