import React from 'react';

import { NavLink } from 'react-router-dom';

import s from './Nav.module.scss';

const Nav = () => {
  return (
    <nav className={ s.Nav }>
      <NavLink className={ s.Item } to='/'>
        Home
      </NavLink>
      <NavLink className={ s.Item } to='/about'>
        About
      </NavLink>
    </nav>
  )
}

export default Nav;