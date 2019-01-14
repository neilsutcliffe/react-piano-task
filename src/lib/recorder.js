// Shorthand to get current time in MS. Used for recording, which is normalised to zero on note playback
const CurrentMs = _ => new Date().getTime()

// Records all notes coming in, with the time recieved. This can be played back using the Player class.
export default class {

    openNotes = []
    notes = []

    getNoteAtCurrentTime = (midiNo) => {
        return { start: CurrentMs(), midiNo }
    }

    AddNoteStart = (midiNo) => {
        this.openNotes.push(this.getNoteAtCurrentTime(midiNo))
    }
    AddNoteEnd = (midiNo) => {
        this.openNotes.forEach(note => {
            if (note.midiNo === midiNo) {
                note.end = CurrentMs();

                // Add to the recorded notes, now with a start and end
                this.notes.push(note)
            }
        })

        // We have closed this particular midi number now.
        this.openNotes = this.openNotes.filter(note => note.midiNo !== midiNo)
    }

    TakeRecording = () => {
        // Reset and return notes to save
        // Open notes are lost. 
        var result = this.notes;
        this.openNotes = [];
        this.notes = [];
        return result;
    }
}
