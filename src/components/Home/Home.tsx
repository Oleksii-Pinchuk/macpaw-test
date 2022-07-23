import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../../images/logo.svg";
import voteTableImage from "../../images/vote-table.svg";
import imagesSearchImage from "../../images/images-search.svg";
import petBreedsImage from "../../images/pet-breeds.svg";
import './Home.scss';

const Home = () => {
  return (
    <div className="home">
         <NavLink
              to="/home"
              className="home__link"
            >
              <img src={logo} className="home__logo" alt="logo" />
            </NavLink>
      <h1 className="home__main-title">Hi intern!</h1>
      <p className="home__description">Welcome to MI 2022 Front-end test</p>
      <h3 className="home__secondary-title">Lets start using The Cat API</h3>
      <nav className="home__nav nav">
        <ul className="nav__list">
          <li className="nav__item item">
            <div
              className="item__icon item__icon--voting">
              <img src={voteTableImage} alt="vote-table" />
            </div>

            <NavLink
              to="macpaw-test/voting"
              className="nav__link"
              style={({ isActive }) => (
                isActive ? {
                  background: '#FF868E',
                  color: '#FFFFFF'
                }
                  : {}
              )
              }
            >
              voting
            </NavLink>
          </li>

          <li className="nav__item item">
            <div
              className="item__icon item__icon--breeds">
              <img src={petBreedsImage} alt="pet-breeds" />
            </div>

            <NavLink
              to="macpaw-test/breeds"
              className="nav__link"
              style={({ isActive }) => (
                isActive ? {
                  background: '#FF868E',
                  color: '#FFFFFF'
                }
                  : {}
              )
              }
            >
              breeds
            </NavLink>
          </li>

          <li className="nav__item item">
            <div
              className="item__icon item__icon--gallery">
              <img src={imagesSearchImage} alt="images-search" />
            </div>

            <NavLink
              to="macpaw-test/gallery"
              className="nav__link"
              style={({ isActive }) => (
                isActive ? {
                  background: '#FF868E',
                  color: '#FFFFFF'
                }
                  : {}
              )
              }
            >
              gallery
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>

  );
};

export default Home;