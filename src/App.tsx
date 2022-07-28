/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import BreedInfo from './components/BreedInfo/BreedInfo';
import Breeds from './components/Breeds/Breeds';
import Favourites from './components/Favourites/Favourites';
import Gallery from './components/Gallery/Gallery';
import Likes from './components/Likes/Likes';
import Voting from './components/Voting/Voting';
import Dislikes from './components/Dislikes/Dislikes';
import Search from './components/Search/Search';
import Home from './components/Home/Home';
import GirlAndCat from './components/GirlAndCat/GirlAndCat';
import Header from './components/Header/Header';

import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { getVotes } from './features/votesSlice';
import { getAllBreeds } from './features/breedsSlice';
import { getFavourites } from './features/favouritesSlice';

import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { choosenBreed } = useAppSelector(store => store.breeds);

  useEffect(() => {
    dispatch(getVotes());
    dispatch(getFavourites());
    dispatch(getAllBreeds());
  }, []);

  return (
    <div className="page-container">
      <div className="page">
        <section className="page__left-section">
          <Home />
        </section>
        <section className="section">
          {location.pathname !== '/home' && (<Header />)}
          <Routes>
            <Route />
            <Route path="/voting" element={<Voting />} />
            <Route path="/breeds" element={<Breeds />} />
            <Route path={`/breeds/${choosenBreed.id}`} element={<BreedInfo breed={choosenBreed} />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/search" element={<Search />} />
            <Route path="/likes" element={<Likes />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/dislikes" element={<Dislikes />} />
            <Route path="/home" element=
              {
                <>
                  <Home />
                  <GirlAndCat />
                </>
              }
            />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default App;
