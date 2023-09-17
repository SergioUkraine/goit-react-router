import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as API from '../../services/api';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/pokemon';

  useEffect(() => {
    async function getDetails() {
      try {
        const response = await API.getDetails(id);
        setPokemon(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
    getDetails();
  }, [id]);

  if (!pokemon) return;
  const url = pokemon.sprites.other['official-artwork'].front_default;
  const alt = pokemon.forms[0].name;
  const name = pokemon.name;
  return (
    <div>
      <Link to={backLinkHref}>Back to pokemons</Link>
      <p>Pokemon name: {name}</p>
      <img width={200} src={url} alt={alt} />
    </div>
  );
}

export default PokemonDetails;
