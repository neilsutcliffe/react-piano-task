import React from 'react';
import styles from './tile.module.scss';

export default ({ song, onClick }) => (
  <div className={styles.base} onClick={onClick}>
    <h2>{song.title}</h2>
  </div>
);
