import React from 'react';

import Wrapper from '../Wrapper';

import s from './Header.module.scss';

const Header = ({ children }) => {
  return (
    <header className={s.header}>
      <Wrapper>
        {children}
      </Wrapper>
    </header>
  )
}

export default Header;