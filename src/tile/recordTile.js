import React from 'react';
import style from './tile.module.scss';

export default ({ recording, onClick }) => {
  const correctStyle = recording ? style.recording : style.new;
  const correctText = recording ? 'Stop' : 'Record';

  return (
    <div onClick={onClick} className={correctStyle}>
      <h2>{correctText}</h2>
    </div>
  );
};
