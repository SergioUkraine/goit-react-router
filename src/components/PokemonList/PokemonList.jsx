import PokemonItem from './PokemonItem';

function PokemonList({ pokemons, offset }) {
  return (
    <ul>
      {pokemons.map((pokemon, index) => {
        return (
          <PokemonItem
            key={index}
            name={pokemon.name}
            id={index + offset + 1}
          />
        );
      })}
    </ul>
  );
}

export default PokemonList;
