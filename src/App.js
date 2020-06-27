import React from 'react';

import Header from './components/Header';
import Logo from './components/Logo';
import Hero from './components/Hero';
import CardList from './components/CardList';
import Footer from './components/Footer';

import { TranslationOutlined } from '@ant-design/icons';
import {wordsList} from './wordsList';

const App = () => {
  return (
    <React.Fragment>
      <Header>
        <Logo url='/' width='auto'>
          <TranslationOutlined style={{ fontSize: '64px', color: '#fff' }} />
        </Logo>
      </Header>
      <main>
        <Hero 
          title='Учите слова онлайн'
          description='Воспользуйтесь карточками для запоминания и пополнения активныйх словарных запасов' 
        />
        <CardList title='Слова этого дня' array={wordsList} />
      </main>
      <Footer>
        <p style={{textAlign: 'right'}}>React Marathon © 2020</p>
      </Footer>
    </React.Fragment>
  )
}

export default App;
