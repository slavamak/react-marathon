import React, { Component } from 'react';

import Section from '../Section';
import Wrapper from '../Wrapper';
import Card from '../Card';

import { Input } from 'antd';
import 'antd/lib/input/style/index.css';

import getTranslateWord from '../../services/dictionary';

import s from './CardList.module.scss';

class CardList extends Component {

  state = {
    error: false,
    isBusy: false,
    eng: '',
    rus: '',
    searchValue: ''
  }

  inputRef = React.createRef();

  constructor(props) {
    super(props)
    props.searchRef(this.inputRef)
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.onAddItem({
      eng: this.state.eng,
      rus: this.state.rus,
      isRemembered: false
    });
    this.setState({
      eng: '',
      rus: ''
    })
  }

  getWord = async () => {
    const { searchValue } = this.state;
    const translateWord = await getTranslateWord(searchValue);

    this.setState({
      error: translateWord.message || false,
      isBusy: false,
      eng: translateWord.text || '',
      rus: translateWord.translate || '',
      searchValue: ''
    })
  }

  handleSearchWord = async () => {
    this.setState({
      isBusy: true,
      eng: '',
      rus: ''
    }, this.getWord)
  }

  handleSearchChange = (e) => {
    this.setState({
      searchValue: e.target.value
    })
  }

  render() {
    const { title, onDeletedItem, onRememberedItem, array = [] } = this.props;
    const { error, searchValue, isBusy, eng, rus } = this.state;
    const { Search } = Input;

    return (
      <Section className='section wordsDay'>
        <Wrapper className='wrapperSm'>
          <h2 className='textCenter section__title'>{ title ? title : 'Заголовок секции' }</h2>

          <div className='textCenter'>
            <h3>Добавь новое слово</h3>

            {
              error ? <div>{ error }</div> : null
            }

            <Search 
              ref={this.inputRef}
              placeholder="Поиск слова"
              onSearch={this.handleSearchWord}
              onChange={this.handleSearchChange}
              value={searchValue}
              loading={isBusy}
              enterButton
            />
            <form
              className={s.wordsDay__form}
              onSubmit={ this.handleFormSubmit }
            >
              <input 
                type='text'
                onChange={ this.handleInputChange }
                value={ eng }
                name='eng'
                placeholder='Англ. слово'
                required
              />
              <input 
                type='text'
                onChange={ this.handleInputChange }
                value={ rus }
                name='rus'
                placeholder='Перевод'
                required
              />
              <button>Добавить</button>
            </form>
          </div>
          <div className={s.wordsDay__list}>
            { 
              array
                .map(({ eng, rus, id, isRemembered }) => (
                  <Card 
                    onDeleted={() => onDeletedItem(id)}
                    onRemembered={(value) => onRememberedItem(id, value)}
                    className={s.wordsDay__listItem}
                    isRemembered={isRemembered}
                    eng={eng}
                    rus={rus}
                    key={id + eng}
                  />
                ))
            }
          </div>
        </Wrapper>
      </Section>
    )
  }
}

export default CardList