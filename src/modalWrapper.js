import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import style from './modal.module.scss';

export default class extends Component {
  constructor(props) {
    super(props);
    this.el = document.querySelector('body');
  }

  render() {
    const { title, children } = this.props;
    const wrapper = (
      <div className={style.darken}>
        <div className={style.modal}>
          <h3>{title} </h3>
          <div className={style.modalContent}>{children}</div>
        </div>
      </div>
    );

    return ReactDOM.createPortal(wrapper, this.el);
  }
}
