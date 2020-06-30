import React, { Component } from 'react';

import Header from './components/Header';
import Logo from './components/Logo';
import Hero from './components/Hero';
import CardList from './components/CardList';
import Footer from './components/Footer';

import { TranslationOutlined } from '@ant-design/icons';
import { wordsList } from './wordsList';

class App extends Component {

  state = {
    wordsArr: wordsList
  }

  handleDeletedItem = (id) => {
    this.setState(({ wordsArr }) => {
      const idx = wordsArr.findIndex(item => item.id === id);
      const newWordsArr = [
        ...wordsArr.slice(0, idx),
        ...wordsArr.slice(idx + 1)
      ];

      return {
        wordsArr: newWordsArr
      }
    })
  }

  handleAddItem = (word) => {
    this.setState(({ wordsArr }) => {
      const newWordsArr = [...wordsArr],
            lastWordId = [...newWordsArr].pop().id,
            newWordId = {id: +lastWordId + 1},
            newWord = {...word, ...newWordId};

      newWordsArr.push(newWord);

      return {
        wordsArr: newWordsArr
      }
    })
  }

  render() {
    const { wordsArr } = this.state;

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
          <CardList 
            onDeletedItem={this.handleDeletedItem}
            onAddItem={this.handleAddItem}
            title='Слова этого дня'
            array={ wordsArr }
          />
        </main>
        <Footer>
          <p style={{textAlign: 'right'}}>React Marathon © 2020</p>
        </Footer>
      </React.Fragment>
    )
  }
}

export default App;
