import styles from './tile.module.scss'
import React, { Component } from 'react';

export default class Song extends Component {
    render() {
        const { song, onClick } = this.props;
        return (<div className={styles.base} onClick={onClick}><h2>{song.title}</h2></div>)
    }
}