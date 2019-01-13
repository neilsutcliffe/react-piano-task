var CHROMATIC = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

/**
 * Get the note name (in scientific notation) of the given midi number
 *
 * It uses MIDI's [Tuning Standard](https://en.wikipedia.org/wiki/MIDI_Tuning_Standard)
 * where A4 is 69
 *
 * This method doesn't take into account diatonic spelling. Always the same
 * pitch class is given for the same midi number.
 *
 * @name fromMidi
 * @function
 * @param {Integer} midi - the midi number
 * @return {String} the pitch
 *
 * @example
 * fromMidi(69) // => 'A4'
 */

// 21 = 1st Key, 108 = 88th Key
const pianoStart = 21
const pianoEnd = 108

// Copy paste modified from https://github.com/danigb/music.note.fromMidi/blob/master/test/fromMidi-test.js#L8
const getName = (midiNumber) => {
    if (isNaN(midiNumber) || midiNumber < 0 || midiNumber > 127) return null
    var name = CHROMATIC[midiNumber % 12]
    var oct = Math.floor(midiNumber / 12) - 1
    return name + oct
}

const noToName = (no) => {
    return getName(no)
}

// This is not optimised. It needs the full list to work.
const nameToNo = (name) => getAllNos().find(no => (noToName(no) === name))


const getAllNos = () => {

    var result = []
    for (var i = pianoStart; i <= pianoEnd; i++) {
        result.push(i)
    }

    return result
}

module.exports = { nameToNo, noToName, getAllNos, getName }