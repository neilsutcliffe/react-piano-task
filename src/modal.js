import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import style from './modal.module.scss'
import titleGenerator from './lib/titleGenerator';

// Extract this if  you have more than one modal
class ModalWrapper extends Component {
    constructor(props) {
        super(props);
        this.el = document.querySelector('body');
    }
    render() {
        const { title } = this.props;
        const wrapper =
            <div className={style.darken}>
                <div className={style.modal}>
                    <h3>{title} </h3>
                    <div className={style.modalContent}>
                        {this.props.children}
                    </div>
                </div>
            </div>

        return ReactDOM.createPortal(
            wrapper,
            this.el,
        );
    }
}

class Modal extends Component {
    componentWillMount() {
        this.setState({ title: titleGenerator() })
    }
    changeText = (e) => {
        var value = e.target.value;
        this.setState({ title: value });
    }
    render = () => {
        var { save, discard } = this.props;

        return (
            <ModalWrapper title={"Title Required"}>
                <p>Enter a cool name for your new masterpiece. We suggested one already!</p>
                <input type='text' value={this.state.title} onChange={this.changeText}>
                </input>
                <input type="button" className={style.error} value="Discard" onClick={discard} />
                <input type="button" className={style.success} value="Publish" onClick={_ => save(this.state.title)} />
            </ModalWrapper>
        )
    }
}

export default Modal;