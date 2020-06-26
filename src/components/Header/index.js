import React from 'react';

import s from './Header.module.scss';

const Header = ({ children }) => {
  return (
    <header className={s.header}>
      <div className="wrapper">
        {children}
      </div>
    </header>
  )
}

export default Header;