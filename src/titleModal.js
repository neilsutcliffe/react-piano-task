import React, { Component } from 'react';
import style from './modal.module.scss';
import titleGenerator from './lib/titleGenerator';
import ModalWrapper from './modalWrapper';

// Extract this if  you have more than one modal

class Modal extends Component {
  componentWillMount() {
    this.setState({ title: titleGenerator() });
  }

  changeText = e => {
    const { value } = e.target;
    this.setState({ title: value });
  };

  render = () => {
    const { save, discard } = this.props;
    const { title } = this.state;

    return (
      <ModalWrapper title="Title Required">
        <p>
          Enter a cool name for your new masterpiece. We suggested one already!
        </p>
        <input type="text" value={title} onChange={this.changeText} />
        <input
          type="button"
          className={style.error}
          value="Discard"
          onClick={discard}
        />
        <input
          type="button"
          className={style.success}
          value="Publish"
          onClick={() => save(title)}
        />
      </ModalWrapper>
    );
  };
}

export default Modal;
