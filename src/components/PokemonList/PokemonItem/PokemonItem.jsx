import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function PokemonItem({ name, id }) {
  const location = useLocation();
  return (
    <p>
      <Link to={`${id}`} state={{ from: location }}>
        {name}
      </Link>
    </p>
  );
}

export default PokemonItem;
