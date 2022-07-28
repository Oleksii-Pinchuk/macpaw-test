import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import "./VoteNavigation.scss";

const VoteNavigation = () => {
  return (
    <nav className="vote-nav">
      <NavLink
        to="/likes"
        className={({ isActive }) => classNames(
          'vote-nav__likes',
          {
            'vote-nav__likes--active': isActive,
            'vote-nav__likes--not-active': !isActive,
          }
        )}
      >
      </NavLink>

      <NavLink
        to="/favourites"
        className={({ isActive }) => classNames(
          'vote-nav__favourites',
          {
            'vote-nav__favourites--active': isActive,
            'vote-nav__favourites--not-active': !isActive,
          }
        )}
      >
      </NavLink>

      <NavLink
        to="/dislikes"
        className={({ isActive }) => classNames(
          'vote-nav__dislikes',
          {
            'vote-nav__dislikes--active': isActive,
            'vote-nav__dislikes--not-active': !isActive,
          }
        )}
      >
      </NavLink>
    </nav>
  )
};

export default VoteNavigation;