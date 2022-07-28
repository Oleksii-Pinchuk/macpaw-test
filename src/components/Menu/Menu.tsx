import React from 'react';
import MainNavigation from '../MainNavigation/MainNavigation';

import "./Menu.scss";

type Props = {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>,
};

const Menu: React.FC<Props> = ({ setOpenMenu }) => {

  const onHandleCloseMenu = () => {
    setOpenMenu(false);

    const body = document.querySelector("body") as HTMLBodyElement;
    body.style.overflow = "auto";
  };

  return (
    <div className="menu-background">
      <div className="menu">
        <button
          className="menu__close-button"
          onClick={onHandleCloseMenu}
        ></button>
        <MainNavigation setOpenMenu={setOpenMenu} />
      </div>
    </div>
  )
};

export default Menu;