import React, { Component } from 'react';
import style from './keyboard.module.scss';
import { nameToNo } from '../lib/notes.js';

// Helper method to get if a key is playable and the note if it is
const getKey = (element) => {
    if (element.classList.contains("playable")) return element.id;
    return null;
}

/**
 * We wrap the keyboard to allow us to detect mouse events inside it. This allows us to drag keys
 * rather than click keys, and broadcast the keys out of the keyboard easier
 */
export default class extends Component {
    constructor() {
        super()
        this.state = { pressed: false };
    }

    componentWillMount = () => {
        document.addEventListener("mousedown", this.startPress);
        document.addEventListener("mouseup", this.endPress)
    }

    componentWillUnmount = () => {
        document.removeEventListener("mousedown", this.startPress);
        document.removeEventListener("mouseup", this.startPress);
    }

    triggerKey = (event) => {
        var next = event && event.target && getKey(event.target)
        var previous = this.state && this.state.previous;

        if (next !== previous) {
            if (previous != null) {
                this.props.keyUp(nameToNo(previous))
            }
            if (next != null) {
                this.props.keyDown(nameToNo(next))
            }
        }
        this.setState({ previous: next })
    }

    startPress = (startEvent) => {
        document.addEventListener("mousemove", this.triggerKey);
        this.triggerKey(startEvent)
        this.setState({ pressed: true })
    }
    endPress = (endEvent) => {
        document.removeEventListener("mousemove", this.triggerKey);
        this.triggerKey(null)
        this.setState({ pressed: false })
    }

    render = () => {
        return (
            <div className={this.state.pressed ? style.pressedBoard : style.board}>
                {this.props.children}
            </div>
        )
    }
}
