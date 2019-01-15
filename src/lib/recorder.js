// Shorthand to get current time in MS. Used for recording, which is normalised to zero on note playback
const CurrentMs = () => new Date().getTime();

// Records all notes coming in, with the time recieved. This can be played back using the Player class.
export default class {
  openNotes = [];

  notes = [];

  getNoteAtCurrentTime = midiNo => ({ start: CurrentMs(), midiNo });

  AddNoteStart = midiNo => {
    this.openNotes.push(this.getNoteAtCurrentTime(midiNo));
  };

  AddNoteEnd = midiNo => {
    this.openNotes.forEach(open => {
      const note = open;
      if (note.midiNo === midiNo) {
        // Add to the recorded notes, now with a start and end
        this.notes.push({
          start: open.start,
          end: CurrentMs(),
          midiNo: open.midiNo
        });
      }
    });

    // We have closed this particular midi number now.
    this.openNotes = this.openNotes.filter(note => note.midiNo !== midiNo);
  };

  Get = () =>
    // Reset and return notes to save
    // Open notes are lost.
    this.notes;

  Clear = () => {
    this.openNotes = [];
    this.notes = [];
  };
}
