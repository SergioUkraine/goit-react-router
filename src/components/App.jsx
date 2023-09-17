import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as API from '../services/api';
import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
//pages
// import Home from '';
// import About from '';
// import Pokemon from '';
// import PokemonDetails from '';
// import NotFound from '';
// import Mission from './Mission';
// import Team from './Team';
// import Reviews from './Reviews';
// import SharedLayout from './SharedLayout';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Pokemon = lazy(() => import('pages/Pokemon'));
const PokemonDetails = lazy(() => import('pages/PokemonDetails'));
const NotFound = lazy(() => import('pages/NotFound'));

const Mission = lazy(() => import('./Mission'));
const Team = lazy(() => import('./Team'));
const Reviews = lazy(() => import('./Reviews'));
const SharedLayout = lazy(() => import('./SharedLayout'));

const POKEMONS_PER_PAGE = 50;

function App() {
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
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />}>
          <Route path="mission" element={<Mission />} />
          <Route path="team" element={<Team />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route
          path="/pokemon"
          element={
            <Pokemon
              pokemons={pokemonFilter()}
              onNext={() => {
                setPage(s => s + 1);
              }}
              onPrevoious={() => {
                setPage(s => s - 1);
              }}
              offset={page * POKEMONS_PER_PAGE - POKEMONS_PER_PAGE}
              isNext={disableNextBtn}
              isPrevious={disablePreviousBtn}
              handleChangeInput={pokemonSearch}
              searchValue={pokemonSearchQuery}
            />
          }
        />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
