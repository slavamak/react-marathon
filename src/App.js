import React from 'react';

import BodyBackground from './components/BodyBackground';
import Header from './components/Header';
import Logo from './components/Logo';
import Hero from './components/Hero';
import Footer from './components/Footer';

import { ReactComponent as ReactLogoSvg } from './assets/images/logo.svg';
import BackgroundImage from './assets/images/background.jpg';

const App = () => {
  return (
    <React.Fragment>
      <BodyBackground image={BackgroundImage}/>
      <Header>
        <Logo url='/' width='100px'>
          <ReactLogoSvg />
        </Logo>
      </Header>
      <Hero 
        title='Учите слова онлайн'
        description='Воспользуйтесь карточками для запоминания и пополнения активныйх словарных запасов' 
      />
      <Footer>
        <p style={{textAlign: 'right'}}>React Marathon © 2020</p>
      </Footer>
    </React.Fragment>
  )
}

export default App;
