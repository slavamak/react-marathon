import React from 'react';

import s from './Logo.module.scss';

const Logo = ({ width, url, children }) => {
  const styles = {
    width: width ? width : '60px'
  };

  return (
    <a href={url ? url : '#'} className={s.logo} style={styles}>
      {children}
    </a>
  )
}

export default Logo;