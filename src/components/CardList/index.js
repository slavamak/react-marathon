import React, { Component } from 'react';

import Section from '../Section';
import Wrapper from '../Wrapper';
import Card from '../Card';

import s from './CardList.module.scss';

class CardList extends Component {

  state = {
    eng: '',
    rus: ''
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.onAddItem(this.state);
    this.setState({
      eng: '',
      rus: ''
    })
  }

  render() {
    const { title, onDeletedItem, array = [] } = this.props;

    return (
      <Section className='section wordsDay'>
        <Wrapper className='wrapperSm'>
          <h2 className='textCenter section__title'>{ title ? title : 'Заголовок секции' }</h2>

          <div className={s.wordsDay__list}>
            { 
              array
                .map(({ eng, rus, id }) => (
                  <Card 
                    onDeleted={() => onDeletedItem(id)}
                    className={s.wordsDay__listItem}
                    eng={eng}
                    rus={rus}
                    key={id + eng}
                  />
                ))
            }
          </div>

          <div className='textCenter'>
            <h3>Добавь новое слово</h3>
            <form
              className={s.wordsDay__form}
              onSubmit={ this.handleFormSubmit }
            >
              <input 
                type='text'
                onChange={ this.handleInputChange }
                value={ this.state.eng }
                name='eng'
                placeholder='Англ. слово'
                required
              />
              <input 
                type='text'
                onChange={ this.handleInputChange }
                value={ this.state.rus }
                name='rus'
                placeholder='Перевод'
                required
              />
              <button>Добавить</button>
            </form>
          </div>
        </Wrapper>
      </Section>
    )
  }
}

export default CardList