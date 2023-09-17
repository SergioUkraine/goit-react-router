import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as API from '../../services/api';

import PokemonList from 'components/PokemonList';

const POKEMONS_PER_PAGE = 50;

function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [disableNextBtn, setDisableNextBtn] = useState(false);
  const [disablePreviousBtn, setDisablePreviousBtn] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const pokemonSearchQuery = searchParams.get('pokemon')
    ? searchParams.get('pokemon')
    : '';
  useEffect(() => {
    async function getPokemons() {
      try {
        const offset = page * POKEMONS_PER_PAGE - POKEMONS_PER_PAGE;
        const responce = await API.getPokemonList(offset, POKEMONS_PER_PAGE);
        setPokemons(responce.results);
        if (page === 1) setDisablePreviousBtn(true);
        else setDisablePreviousBtn(false);
        if (responce.count - (page - 1) * POKEMONS_PER_PAGE < POKEMONS_PER_PAGE)
          setDisableNextBtn(true);
        else setDisableNextBtn(false);
      } catch (error) {
        console.log(error);
      }
    }
    getPokemons();
  }, [page]);

  const handleClickPrevious = () => {
    setPage(s => s - 1);
  };

  const handleClickNext = () => {
    setPage(s => s + 1);
  };

  const pokemonSearch = async e => {
    const pokemonSearch = e.currentTarget.value.toLowerCase();
    setSearchParams(pokemonSearch ? { pokemon: pokemonSearch } : {});
  };

  const pokemonFilter = () => {
    return pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(pokemonSearchQuery)
    );
  };

  return (
    <div>
      <span>Pokemon: </span>

      <input onChange={pokemonSearch} value={pokemonSearchQuery}></input>
      <PokemonList
        pokemons={pokemonFilter()}
        offset={page * POKEMONS_PER_PAGE - POKEMONS_PER_PAGE}
      />
      <button
        name="previous"
        type="button"
        onClick={handleClickPrevious}
        disabled={disablePreviousBtn}
      >
        Previous
      </button>
      <button
        name="next"
        type="button"
        onClick={handleClickNext}
        disabled={disableNextBtn}
      >
        Next
      </button>
    </div>
  );
}

export default Pokemons;
