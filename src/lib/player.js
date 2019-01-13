
// This class has to be created for each song at this time. TODO: fix up
export default class {

    constructor(sampler) {
        this.sampler = sampler
        this.endedEarly = false;
        this.startTimeouts = []
        this.endTimeoutes = []
    }

    playSong(songNotes) {
        // Removing console.log breaks first note? Brittle?
        console.log(songNotes)

        var times = songNotes.map(note => note.start)
        var lowest = Math.min(...times)

        songNotes.forEach(note => {
            this.startTimeouts.push(setTimeout(() => {
                if (!this.endedEarly) this.sampler.playSound(note.midiNo)
            }, note.start - lowest))

            this.endTimeoutes.push(setTimeout(() => {
                this.sampler.muteSound(note.midiNo)
            }, note.end - lowest));
        })
    }

    stopSong = () => {
        // Clear timeouts. We want to mute all future notes
        this.startTimeouts.forEach(timeout => clearTimeout(timeout))
        this.endTimeoutes.forEach(timeout => clearTimeout(timeout))

        this.startTimeouts = [];
        this.endTimeoutes = [];

        this.sampler.muteAllForcibly();
    }
}
