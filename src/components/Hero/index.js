import React from 'react';

import s from './Hero.module.scss';

const Hero = ({ title, description, children }) => {
  return (
    <div className={s.hero}>
      <div className='wrapper'>
        {title && <h1 className={s.hero__title}>{title}</h1>}
        {description && <p className={s.hero__description}>{description}</p>}
        {children}
      </div>
    </div>
  )
}

export default Hero;