import React, { Component } from 'react';

import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'

// Components
import Song from './song'
import NewSong from './song/record'
import Keyboard from './keyboard'

// Audio Classes
import Sampler from './lib/sampler'
import Recorder from './lib/recorder'
import Player from './lib/player'

// Useful functions
import { getAllNos } from './lib/notes';
import titleGenerator from './lib/titleGenerator';

import style from './app.module.scss'

// Main Logic for playback and recording. These are reused for every recording/song
const sampler = new Sampler(getAllNos());
const player = new Player(sampler);
const recorder = new Recorder();

const songQuery = gql` { songs { id title notes } } `;

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
          <Query query={songQuery}>
            {({ loading, error, data }) => {
              if (data === undefined) return null;
              if (loading) return "Loading"
              if (error) return `Error! ${error.message}`;
              return (
                data.songs.map(thisSong =>
                  <Song key={thisSong.id} song={thisSong} onClick={_ => this.playSong(thisSong)} />
                )
              )
            }}
          </Query>

          <Mutation
            mutation={gql` mutation addSong($song: SongInput!) { addSong(input: $song) { id notes title } }`}
            refetchQueries={[{ query: songQuery }]}>
            {(addSong, { loading, error }) => {
              const handleStop = () => {
                let notes = recorder.TakeRecording()
                let song = {
                  title: titleGenerator(),
                  notes: JSON.stringify(notes)
                };

                addSong({ variables: { song } })
                this.toggleRecord();
              }

              if (this.state.recording) return <NewSong recording={true} onClick={handleStop} />
              else return <NewSong recording={false} onClick={this.toggleRecord} />
            }}

          </Mutation>
        </div>

        <Keyboard sampler={sampler} keyDown={this.startNote} keyUp={this.endNote} />
      </div>
    );
  }
}

export default App;
