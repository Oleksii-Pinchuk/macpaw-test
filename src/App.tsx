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

import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { getVotes } from './features/votesSlice';
import { getAllBreeds } from './features/breedsSlice';

import './App.scss';
import GirlAndCat from './components/GirlAndCat/GirlAndCat';
import Header from './components/Header/Header';
import { getFavourites } from './features/favouritesSlice';

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
        <Home />
        <section>
          {location.pathname !== '/macpaw-test/home' && (<Header />)}
          <Routes>
            <Route />
            <Route path="macpaw-test/voting" element={<Voting />} />
            <Route path="macpaw-test/breeds" element={<Breeds />} />
            <Route path={`macpaw-test/breeds/${choosenBreed.id}`} element={<BreedInfo breed={choosenBreed} />} />
            <Route path="macpaw-test/gallery" element={<Gallery />} />
            <Route path="macpaw-test/search" element={<Search />} />
            <Route path="macpaw-test/likes" element={<Likes />} />
            <Route path="macpaw-test/favourites" element={<Favourites />} />
            <Route path="macpaw-test/dislikes" element={<Dislikes />} />
            <Route path="macpaw-test/home" element={<GirlAndCat />} />
            <Route path="*" element={<Navigate to="/macpaw-test/home" />} />
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default App;
