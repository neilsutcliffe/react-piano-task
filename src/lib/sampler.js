import { noToName } from './notes.js';

// TODO. No indication of if sampler is ready
// TODO. Looping for notes. Bass notes get cut off early if too long
export default class {
    constructor(numbers) {
        if (numbers != null && numbers.length > 0) {
            var _this = this;
            numbers.forEach(_this.addSound)
        }
    }

    audioSource = {}

    // This needs to be called for each key we need to add
    addSound = (no) => {
        var key = noToName(no)

        var audio = new Audio(`/assets/${key}.mp3`)
        audio.volume = 1
        this.audioSource[key] = audio
    }

    playSound = (no) => {
        var key = noToName(no)

        var match = this.audioSource[key]
        if (match == null) console.error(`Cannot find audio for Key ${key}`)
        else match.play()
    }

    muteSound = (no) => {
        var key = noToName(no)
        this.mute(key, false)
    }

    mute = (key, immediate) => {
        var audio = this.audioSource[key]
        if (audio == null) return

        // This makes adds a 10ms decay to each note. This prevents pops and clicks.
        // Note. if this is set too slow, then polyphony needs to be added for rapid fire notes TODO
        var fadeInterval = setInterval(function () {
            if (immediate || audio.volume < 0.1) {
                clearInterval(fadeInterval)
                audio.pause();
                // And reset
                audio.volume = 1
                audio.currentTime = 0
                return;
            }
            audio.volume -= 0.1
        }, 2);
    }

    muteAllForcibly = () => {
        // foreach swallows scope
        var _this = this;
        Object.keys(this.audioSource).forEach(function (key, index) {
            _this.mute(key, true)
        });
    }
}
