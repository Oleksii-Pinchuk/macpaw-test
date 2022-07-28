import React from 'react';
import { NavLink } from 'react-router-dom';

import voteTableImage from "../../images/vote-table.svg";
import imagesSearchImage from "../../images/images-search.svg";
import petBreedsImage from "../../images/pet-breeds.svg";
import "./MainNavigation.scss";

type Props = {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>,
};

const MainNavigation: React.FC<Props> = ({ setOpenMenu }) => {
  const onHandleMenuItem = () => {
    setOpenMenu(false);

    const body = document.querySelector("body") as HTMLBodyElement;
    body.style.overflow = "auto";
  };

  return (
    <nav className="main-navigation">
        <ul className="main-navigation__list">
          <li className="main-navigation__item item">
            <div
              className="item__icon item__icon--voting">
              <img src={voteTableImage} alt="vote-table" />
            </div>

            <NavLink
              onClick={onHandleMenuItem}
              to="/voting"
              className="main-navigation__link"
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

          <li className="main-navigation__item item">
            <div
              className="item__icon item__icon--breeds">
              <img src={petBreedsImage} alt="pet-breeds" />
            </div>

            <NavLink
              to="/breeds"
              className="main-navigation__link"
              style={({ isActive }) => (
                isActive ? {
                  background: '#FF868E',
                  color: '#FFFFFF'
                }
                  : {}
              )
              }
              onClick={onHandleMenuItem}
            >
              breeds
            </NavLink>
          </li>

          <li className="main-navigation__item item">
            <div
              className="item__icon item__icon--gallery">
              <img src={imagesSearchImage} alt="images-search" />
            </div>

            <NavLink
              to="/gallery"
              className="main-navigation__link"
              style={({ isActive }) => (
                isActive ? {
                  background: '#FF868E',
                  color: '#FFFFFF'
                }
                  : {}
              )
              }
              onClick={onHandleMenuItem}
            >
              gallery
            </NavLink>
          </li>
        </ul>
      </nav>
  )
};

export default MainNavigation;