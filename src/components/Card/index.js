import React, { Component } from 'react';
import cn from 'classnames';

import s from './Card.module.scss';

class Card extends Component {

  state = {
    active: false
  }

  handleCardClick = () => {
    this.setState({
      active: !this.state.active
    })
  }

  render() {
    const { className, eng, rus } = this.props;
    const {active} = this.state;

    return (
      <div 
        className={cn(s.card, {[s.active]: active, [className]: className})}
        onClick={this.handleCardClick}
      >
        <div className={s.cardInner}>
          <div className={s.cardFront}>
            { eng }
          </div>
          <div className={s.cardBack}>
            { rus }
          </div>
        </div>
      </div>
    );
  }
}

export default Card;