import React from 'react';
import style from './keyboard.module.scss';

export default ({ note }) => {
  let keyColor = note.Ivory ? style.white : style.black;

  // Add offset classes if needed
  const leftmost = note.midiName.includes('Db') || note.midiName.includes('Gb');
  const rightmost =
    note.midiName.includes('Eb') || note.midiName.includes('Bb');
  keyColor = leftmost ? style.offsetLeft : keyColor;
  keyColor = rightmost ? style.offsetRight : keyColor;

  // Add the class we use to filter for keys that can be played in the wrapper
  keyColor += ' playable';

  return <div className={[keyColor]} id={note.midiName} />;
};
