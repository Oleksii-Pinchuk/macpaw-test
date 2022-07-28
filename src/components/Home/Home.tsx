import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from "../../images/logo.svg";
import MainNavigation from '../MainNavigation/MainNavigation';

import './Home.scss';

const Home = () => {
  return (
    <div className="home">
      <header className="home__header">
        <NavLink
          to="/home"
          className="home__link"
        >
          <img src={logo} className="home__logo" alt="logo" />
        </NavLink>    
      </header>

      <h1 className="home__main-title">Hi intern!</h1>
      <p className="home__description">Welcome to MI 2022 Front-end test</p>
      <h3 className="home__secondary-title">Lets start using The Cat API</h3>
      <MainNavigation setOpenMenu={() => {}} />
    </div>

  );
};

export default Home;