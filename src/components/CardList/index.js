import React from 'react';

import Section from '../Section';
import Wrapper from '../Wrapper';
import Card from '../Card';

import s from './CardList.module.scss';

const CardList = ({ title, array = [] }) => {
  return (
    <Section className='section wordsDay'>
      <Wrapper className='wrapper--sm'>
        <h2 className='text-center section__title'>{ title ? title : 'Заголовок секции' }</h2>
        <div className={s.wordsDay__list}>
          { 
            array
              .map(({ eng, rus }, index) => (
                <Card className={s.wordsDay__listItem} eng={eng} rus={rus} key={index} />
              ))
          }
        </div>
      </Wrapper>
    </Section>
  )
}

export default CardList