import React, { Component } from 'react';
import Keyboard from './keyboard'
import Song from './song/existingSong'
import NewSong from './song/newSong'
import Sampler from './lib/sampler'
import Recorder from './lib/recorder'
import Player from './lib/player'
import { getAllNos } from './lib/notes';
import titleGenerator from './lib/titleGenerator';

import style from './app.module.scss'

// Main Logic for playback and recording
let sampler = new Sampler(getAllNos());
let player = new Player(sampler);
let recorder = new Recorder();

class App extends Component {
  constructor() {
    super()
    this.state = { songs: [], recording: false }
  }
  startNote = (midiNo) => {
    sampler.playSound(midiNo)

    if (this.state.recording) {
      recorder.AddNoteStart(midiNo)
    }
  }
  endNote = (midiNo) => {
    sampler.muteSound(midiNo)

    if (this.state.recording) {
      recorder.AddNoteEnd(midiNo)
    }
  }
  toggleRecord = () => {
    if (this.state.recording) {
      // Save song to list
      let notes = recorder.TakeRecording()

      // Add song to list if any notes
      if (notes.length > 0) {
        let newSongList = this.state.songs
        newSongList.push({
          title: titleGenerator(),
          notes,
          id: newSongList.length
        });

        this.setState({ songs: newSongList })
      }
    }

    this.setState({ recording: !this.state.recording })
  }
  playSong = (song) => {
    // Stop existing song
    if (player !== null) player.stopSong();

    player.playSong(song.notes)
  }
  render() {
    return (
      <div className="App">
        <header>
          <img src=".\flowkey.svg" alt="Flowkey Logo" height="50px" />
          <h1>React Piano Task</h1>
        </header>

        <div className={style.container}>
          {
            this.state.songs.map(thisSong => <Song key={thisSong.id} song={thisSong} onClick={_ => this.playSong(thisSong)} />)
          }
          <NewSong empty={true} recording={this.state.recording} onClick={this.toggleRecord} />
        </div>

        <Keyboard sampler={sampler} keyDown={this.startNote} keyUp={this.endNote} />
      </div>
    );
  }
}

export default App;
