import React, { Component } from 'react';

import Header from '../../components/Header';
import Logo from '../../components/Logo';
import Hero from '../../components/Hero';
import CardList from '../../components/CardList';
import Footer from '../../components/Footer';

import FirebaseContext from '../../context/firebaseContext';

import { Button } from 'antd';
import { TranslationOutlined, ArrowDownOutlined, LogoutOutlined } from '@ant-design/icons';

class HomePage extends Component {

  state = {
    wordsArr: []
  }

  searchRef;

  componentDidMount() {
    const { getUserCardsRef } = this.context;

    getUserCardsRef().on('value', res => {
      this.setState({
        wordsArr: res.val() || []
      });
    });
  }

  handleDeletedItem = (id) => {
    const { wordsArr } = this.state;
    const { getUserCardsRef } = this.context;

    const newWordsArr = wordsArr.filter(item => item.id !== id)

    getUserCardsRef().set(newWordsArr, error => error ? console.log(error) : console.log('Success!'));
  }

  handleAddItem = (word) => {
    const { wordsArr } = this.state;
    const { getUserCardsRef } = this.context;

    const newWordsArr = [...wordsArr, {
      id: +new Date(),
      ...word
    }];
    
    getUserCardsRef().set(newWordsArr, error => error ? console.log(error) : console.log('Success!'));
  }

  handleRememberedItem = (id, remember) => {
    const { wordsArr } = this.state;
    const { getUserCardsRef } = this.context;

    const newWordsArr = wordsArr.map(item => (item.id === id ? {...item, isRemembered: remember} : {...item}));

    getUserCardsRef().set(newWordsArr, error => error ? console.log(error) : console.log('Success!'));
  }

  handleSignOut = () => {
    const { auth } = this.context;

    auth.signOut().then(() => {
      console.log('Sign-out successful.')
    }).catch(error => {
      console.log(error)
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
          <Button 
            shape='round'
            icon={<LogoutOutlined />}
            size='large'
            onClick={this.handleSignOut}
          >
            Выйти
          </Button>
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

HomePage.contextType = FirebaseContext;

export default HomePage;
