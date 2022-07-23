import React from 'react';
import SearchBreedForm from '../SearchBreedForm/SearchBreedForm';
import VoteNavigation from '../VoteNavigation/VoteNavigation';

import "./Header.scss";

const Header = () => (
  <header className='header'>
    <SearchBreedForm />
    <VoteNavigation />
  </header>
);

export default Header;