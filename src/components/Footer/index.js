import React from 'react';

import s from './Footer.module.scss';

const Footer = ({ children }) => {
  return (
    <footer className={s.footer}>
      <div className="wrapper">
        {children}
      </div>
    </footer>
  )
}

export default Footer;