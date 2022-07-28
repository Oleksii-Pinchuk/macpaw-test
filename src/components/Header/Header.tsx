import React, { useState } from 'react';
import Menu from '../Menu/Menu';
import SearchBreedForm from '../SearchBreedForm/SearchBreedForm';
import VoteNavigation from '../VoteNavigation/VoteNavigation';

import "./Header.scss";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const onHandleMenuButton = () => {
    setMenuOpen(true);

    const body = document.querySelector("body") as HTMLBodyElement;
    body.style.overflow = "hidden";
  };

  return (
    <header className='header'>
      <button
        type="button"
        className="header__menu-button"
        onClick={onHandleMenuButton}
      ></button>

      {menuOpen && <Menu setOpenMenu={setMenuOpen} />}
      <SearchBreedForm />
      <VoteNavigation />
    </header>
  );
};

export default Header;