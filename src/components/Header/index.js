import React from 'react';

import Wrapper from '../Wrapper';

import s from './Header.module.scss';

const Header = ({ children }) => {
  return (
    <header>
      <Wrapper>
        <div className={s.header}>
          {children}
        </div>
      </Wrapper>
    </header>
  )
}

export default Header;