import React from 'react';

import Wrapper from '../Wrapper';

import s from './Footer.module.scss';

const Footer = ({ children }) => {
  return (
    <footer className={s.footer}>
      <Wrapper>
        {children}
      </Wrapper>
    </footer>
  )
}

export default Footer;