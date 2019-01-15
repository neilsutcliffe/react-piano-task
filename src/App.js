import React, { Component } from 'react';

import queries from './gql.js'
import { Query } from 'react-apollo'

// Components
import SongTile from './tile/songTile'
import Keyboard from './keyboard'
import Record from './record'

// Audio Classes
import Sampler from './lib/sampler'
import Recorder from './lib/recorder'
import Player from './lib/player'

import style from './app.module.scss'

// Main Logic for playback and recording. These are reused for every recording/song
const sampler = new Sampler();
const player = new Player(sampler);
const recorder = new Recorder();

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
    recorder.Clear();
    this.setState({ recording: !this.state.recording })
  }
  playSong = (song) => {
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
          <Query query={queries.songQuery}>
            {({ loading, error, data }) => {
              if (data === undefined) return null;
              if (loading) return "Loading"
              if (error) return `Error! ${error.message}`;
              return (
                data.songs.map(thisSong =>
                  <SongTile key={thisSong.id} song={thisSong} onClick={_ => this.playSong(thisSong)} />
                )
              )
            }}
          </Query>
          <Record toggleRecord={this.toggleRecord} recorder={recorder} recording={this.state.recording} />
        </div>
        <Keyboard sampler={sampler} keyDown={this.startNote} keyUp={this.endNote} />
      </div >
    );
  }
}


export default App;
