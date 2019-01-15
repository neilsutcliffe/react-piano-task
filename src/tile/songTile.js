import React from 'react';
import styles from './tile.module.scss';

export default ({ song, onClick }) => (
  <div
    className={styles.base}
    role="button"
    onClick={onClick}
    onKeyPress={onClick}
    tabIndex="-1"
  >
    <h2>{song.title}</h2>
  </div>
);
