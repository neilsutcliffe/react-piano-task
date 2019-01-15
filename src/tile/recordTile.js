import style from './tile.module.scss'
import React from 'react';

export default ({ recording, onClick }) => {

    var correctStyle = recording ? style.recording : style.new
    var correctText = recording ? "Stop" : "Record"

    return (<div onClick={onClick} className={correctStyle}><h2>{correctText}</h2></div>)
}
