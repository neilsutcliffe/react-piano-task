import React from 'react';
import style from './tile.module.scss';

export default ({ recording, onClick }) => {
  const correctStyle = recording ? style.recording : style.new;
  const correctText = recording ? 'Stop' : 'Record';

  return (
    <div
      role="button"
      onClick={onClick}
      onKeyPress={onClick}
      tabIndex="-1"
      className={correctStyle}
    >
      <h2>{correctText}</h2>
    </div>
  );
};
