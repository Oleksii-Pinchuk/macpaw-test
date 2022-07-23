import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import "./VoteNavigation.scss";

const VoteNavigation = () => {
  return (
    <nav className="vote-nav section__nav">
      <NavLink
        to="macpaw-test/likes"
        className={({ isActive }) => classNames(
          'vote-nav__button',
          'vote-nav__button--likes',
          { 'vote-nav__button--likes-active': isActive }
        )}
      >
      </NavLink>

      <NavLink
        to="macpaw-test/favourites"
        className={isActive =>
          "vote-nav__button vote-nav__button--favourites" + (!isActive ? " vote-nav__button--favourites" : "")
        }
      >
      </NavLink>

      <NavLink
        to="macpaw-test/dislikes"
        className={({ isActive }) => classNames(
          { selected: isActive },
          'vote-nav__button',
          'vote-nav__button--dislikes'
        )}
      >
      </NavLink>
    </nav>
  )
};

export default VoteNavigation;