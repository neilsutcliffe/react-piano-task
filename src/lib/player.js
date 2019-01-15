// The can be reused and is cleared on stop. No pause functionality at this time.
export default class {
  constructor(sampler) {
    this.sampler = sampler;
    this.endedEarly = false;
    this.startTimeouts = [];
    this.endTimeoutes = [];
  }

  playSong(notesToPlay) {
    let notes = notesToPlay;
    this.stopSong();

    // Handle JSON notes
    if (typeof notesToPlay === 'string') notes = JSON.parse(notesToPlay);

    const times = notes.map(note => note.start);
    const lowest = Math.min(...times);

    // Give time to fade out if needed.
    setTimeout(() => {
      notes.forEach(note => {
        this.startTimeouts.push(
          setTimeout(() => {
            if (!this.endedEarly) this.sampler.playSound(note.midiNo);
          }, note.start - lowest)
        );

        this.endTimeoutes.push(
          setTimeout(() => {
            this.sampler.muteSound(note.midiNo);
          }, note.end - lowest)
        );
      });
    }, 100);
  }

  stopSong = () => {
    // Clear timeouts. We want to mute all future notes
    this.startTimeouts.forEach(timeout => clearTimeout(timeout));
    this.endTimeoutes.forEach(timeout => clearTimeout(timeout));

    this.startTimeouts = [];
    this.endTimeoutes = [];

    this.sampler.muteAllForcibly();
  };
}
