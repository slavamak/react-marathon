import React from 'react';

import BodyBackground from '../BodyBackground';
import Section from '../Section';
import Wrapper from '../Wrapper';

import s from './Hero.module.scss';

import BackgroundImage from '../../assets/images/background.jpg';

const Hero = ({ title, description, children }) => {
  return (
    <Section className={s.hero}>
      <BodyBackground image={BackgroundImage}/>
      <Wrapper>
        {title && <h1 className={s.hero__title}>{title}</h1>}
          {description && <p className={s.hero__description}>{description}</p>}
        {children}
      </Wrapper>
    </Section>
  )
}

export default Hero;