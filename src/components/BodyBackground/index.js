import React from 'react';

import s from './BodyBackground.module.scss';

const BodyBackground = ({ image }) => {
  const backgroundImage = {
    backgroundImage: image ? `url(${image})` : 'none'
  };

  return (
    <div className={s.cover} style={backgroundImage}></div>
  )
}

export default BodyBackground;