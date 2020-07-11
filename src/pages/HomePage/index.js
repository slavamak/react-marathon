import React, { Component } from 'react';

import Layout from '../../components/Layout';
import Hero from '../../components/Hero';
import CardList from '../../components/CardList';

import FirebaseContext from '../../context/firebaseContext';

import { fetchCardList } from '../../actions/cardListAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';

class HomePage extends Component {

  searchRef;

  componentDidMount() {
    const { getUserCardsRef } = this.context;
    const { fetchCardList } = this.props;

    console.log(this.props)

    fetchCardList(getUserCardsRef);
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

  render() {
    const { wordsArr } = this.props;

    return (
      <Layout>
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
      </Layout>
    )
  }
}

HomePage.contextType = FirebaseContext;

const mapStateToProps = (state) => {
  return {
    isBusy: state.cardList.isBusy,
    wordsArr: state.cardList.payload || []
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchCardList: fetchCardList
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);