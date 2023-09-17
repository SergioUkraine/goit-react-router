import { Link, Outlet } from 'react-router-dom';

function About() {
  return (
    <div>
      <h1>About page</h1>
      <ul>
        <li>
          <Link to="mission">Our mission</Link>
        </li>
        <li>
          <Link to="team">Our team</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default About;
