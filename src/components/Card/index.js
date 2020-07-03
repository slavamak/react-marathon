import React, { Component } from 'react';
import cn from 'classnames';

import s from './Card.module.scss';

import { CheckSquareOutlined, DeleteOutlined } from '@ant-design/icons';

class Card extends Component {

  constructor(props) {
    super(props);

    this.state = {
      active: props.isRemembered,
      isRemembered: props.isRemembered
    }
  }

  handleCardClick = () => {
    this.setState(({ active, isRemembered }) => {
      return {
        active: isRemembered ? true : !active
      }
    })
  }

  isRememberClick = () => {
    this.props.onRemembered(!this.state.isRemembered);
    this.setState(({ active, isRemembered }) => {
      return {
        isRemembered: !isRemembered,
        active: isRemembered ? false : true
      }
    })
  }

  handleDeletedClick = () => {
    this.props.onDeleted()
  }

  render() {
    const { className, eng, rus } = this.props;
    const { active, isRemembered } = this.state;

    return (
      <div className={cn(s.cardContainer, {[className]: className, [s.active]: active, [s.isRemembered]: isRemembered})}>
        <div 
          className={s.card}
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

        <div className={s.cardControls}>
          <CheckSquareOutlined className={s.check} onClick={this.isRememberClick} />
          <DeleteOutlined className={s.remove} onClick={this.handleDeletedClick} />
        </div>
      </div>
    );
  }
}

export default Card;