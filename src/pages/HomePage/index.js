import React, { Component } from 'react';

import Header from '../../components/Header';
import Logo from '../../components/Logo';
import Hero from '../../components/Hero';
import CardList from '../../components/CardList';
import Footer from '../../components/Footer';

import { database } from '../../services/firebase';

import { Button } from 'antd';
import 'antd/lib/button/style/index.css';

import { TranslationOutlined, ArrowDownOutlined } from '@ant-design/icons';

class HomePage extends Component {

  state = {
    wordsArr: []
  }

  searchRef;

  componentDidMount() {
    database.ref('/cards').once('value').then(res => {
        this.setState({
          wordsArr: res.val()
        });
    });
  }

  handleDeletedItem = (id) => {
    const { wordsArr } = this.state;
    const idx = wordsArr.findIndex(item => item.id === id);
    const newWordsArr = [
      ...wordsArr.slice(0, idx),
      ...wordsArr.slice(idx + 1)
    ];

    database.ref('/cards')
      .set(newWordsArr, error => error ? console.log(error) : console.log('Success!')).then(() => {
        this.setState({
          wordsArr: newWordsArr
        })
      });
  }

  handleAddItem = (word) => {
    const { wordsArr } = this.state;
    const lastWordId = +wordsArr[wordsArr.length - 1].id + 1;
    const newWordsArr = [...wordsArr, {
      id: lastWordId.toString(),
      ...word
    }];
    
    database.ref('/cards').set(newWordsArr, error => error ? console.log(error) : console.log('Success!')).then(() => {
        this.setState({
          wordsArr: newWordsArr
        })
      });
  }

  handleRememberedItem = (id, remember) => {
    const { wordsArr } = this.state;
    const idx = wordsArr.findIndex(item => item.id === id);
    const newWordsArr = [...wordsArr];

    newWordsArr[idx].isRemembered = remember;

    database.ref('/cards').set(newWordsArr, error => error ? console.log(error) : console.log('Success!')).then(() => {
        this.setState({
          wordsArr: newWordsArr
        })
      });
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
          >
            <Button 
              shape='round'
              icon={<ArrowDownOutlined />}
              size='large'
              onClick={() => this.searchRef.current.focus()}
            >
              Начать
            </Button>
          </Hero>
          <CardList 
            onDeletedItem={this.handleDeletedItem}
            onRememberedItem={this.handleRememberedItem}
            onAddItem={this.handleAddItem}
            searchRef={ref => this.searchRef = ref}
            title='Список ваших слов'
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

export default HomePage;
