import { noToName, getAllNos } from './notes';

const { Audio } = window;

// Get all the midi numbers
const numbers = getAllNos();

// TODO. No indication of if sampler is ready
// TODO. Looping for notes. Bass notes get cut off early if too long
export default class {
  constructor() {
    if (numbers != null && numbers.length > 0) {
      const _this = this;
      numbers.forEach(_this.addSound);
    }
  }

  audioSource = {};

  // This needs to be called for each key we need to add
  addSound = no => {
    const key = noToName(no);

    const audio = new Audio(`/assets/${key}.mp3`);
    audio.volume = 1;
    this.audioSource[key] = audio;
  };

  playSound = no => {
    const key = noToName(no);

    const match = this.audioSource[key];
    if (match != null) match.play();
  };

  muteSound = no => {
    const key = noToName(no);
    this.mute(key, false);
  };

  mute = (key, immediate) => {
    const audio = this.audioSource[key];
    if (audio == null) return;

    const fadeInterval = setInterval(() => {
      if (immediate || audio.volume < 0.1) {
        clearInterval(fadeInterval);
        audio.pause();
        // And reset
        audio.volume = 1;
        audio.currentTime = 0;
        return;
      }
      audio.volume -= 0.1;
    }, 2);
    // This makes adds a 10ms decay to each note. This prevents pops and clicks.
    // Note. if this is set too slow, then polyphony needs to be added for rapid fire notes TODO
  };

  muteAllForcibly = () => {
    // foreach swallows scope
    const _this = this;
    Object.keys(this.audioSource).forEach(key => {
      _this.mute(key, true);
    });
  };
}
