
import React from 'react';
import Key from './key'
import KeyBoardWrapper from './keyboardWrapper'
import { getAllNos, noToName } from '../lib/notes.js';

const getAllKeys = () => {
    // Returns note definition required to display the keyboard
    return getAllNos().map(no => {
        var name = noToName(no)
        var black = name.includes("b");

        return {
            midiNumber: no,
            midiName: name,
            Ebony: black,
            Ivory: !black
        }
    })
}

const Keyboard = ({ keyDown, keyUp }) => (
    <KeyBoardWrapper keyDown={keyDown} keyUp={keyUp}>
        {getAllKeys().map(key => <Key key={key.midiNumber} note={key} />)}
    </KeyBoardWrapper>
)

export default Keyboard