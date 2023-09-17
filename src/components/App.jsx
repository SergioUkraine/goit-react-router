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

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />}>
          <Route path="mission" element={<Mission />} />
          <Route path="team" element={<Team />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
