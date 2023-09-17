import PokemonList from 'components/PokemonList';
function Pokemons({
  pokemons,
  onPrevoious,
  onNext,
  isPrevious,
  isNext,
  handleChangeInput,
  searchValue,
  ...otherProps
}) {
  return (
    <div>
      <span>Pokemon: </span>

      <input onChange={handleChangeInput} value={searchValue}></input>
      <PokemonList pokemons={pokemons} {...otherProps} />
      <button type="button" onClick={onPrevoious} disabled={isPrevious}>
        Previous
      </button>
      <button type="button" onClick={onNext} disabled={isNext}>
        Next
      </button>
    </div>
  );
}

export default Pokemons;
