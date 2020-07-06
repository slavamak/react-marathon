import React, { Component } from 'react';

import Section from '../Section';
import Wrapper from '../Wrapper';
import Card from '../Card';

import { Space, Form, Input, Button } from 'antd';
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

  handleFormSubmit = () => {
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
    const translateWord = await getTranslateWord(searchValue, 'ru-en');

    this.setState({
      error: translateWord.message || false,
      isBusy: false,
      eng: translateWord.translate || '',
      rus: translateWord.text || '',
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


            <Space 
              direction="vertical"
              size="large"
              style={ {width: '100%'} }
              >
              {
                error ? <div>{ error }</div> : null
              }

              <Search 
                ref={this.inputRef}
                placeholder="Введите слово на русском"
                onSearch={this.handleSearchWord}
                onChange={this.handleSearchChange}
                value={searchValue}
                loading={isBusy}
                enterButton
              />

              <Form
                className={ s.wordsDay__form }
                layout='vertical'
                onFinish={ this.handleFormSubmit }
                >
                <Form.Item className={ s.wordsDay__formItem }>
                  <Input 
                    onChange={ this.handleInputChange }
                    type='text'
                    value={ rus }
                    name='rus'
                    placeholder='Слово'
                    required
                    />
                </Form.Item>
                <Form.Item className={ s.wordsDay__formItem }>
                  <Input 
                    onChange={ this.handleInputChange }
                    type='text'
                    value={ eng }
                    name='eng'
                    placeholder='Перевод'
                    required
                    />
                </Form.Item>
                <Form.Item className={ s.wordsDay__formItem }>
                  <Button type="primary" htmlType="submit">Добавить</Button>
                </Form.Item>
              </Form>
            </Space>
            

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
                    key={id}
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