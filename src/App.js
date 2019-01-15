import React, { Component } from 'react';

import { Query } from 'react-apollo';
import queries from './gql';

// Components
import SongTile from './tile/songTile';
import Keyboard from './keyboard';
import Record from './record';

// Audio Classes
import Sampler from './lib/sampler';
import Recorder from './lib/recorder';
import Player from './lib/player';

import style from './app.module.scss';

// Main Logic for playback and recording. These are reused for every recording/song
const sampler = new Sampler();
const player = new Player(sampler);
const recorder = new Recorder();

class App extends Component {
  constructor() {
    super();
    this.state = { recording: false };
  }

  startNote = midiNo => {
    sampler.playSound(midiNo);
    const { recording } = this.state;

    if (recording) {
      recorder.AddNoteStart(midiNo);
    }
  };

  endNote = midiNo => {
    sampler.muteSound(midiNo);
    const { recording } = this.state;

    if (recording) {
      recorder.AddNoteEnd(midiNo);
    }
  };

  toggleRecord = () => {
    const { recording } = this.state;
    recorder.Clear();
    this.setState({ recording: !recording });
  };

  playSong = song => {
    player.playSong(song.notes);
  };

  render() {
    const { recording } = this.state;
    return (
      <div className="App">
        <header>
          <h1>React Piano Task</h1>
        </header>
        <div className={style.container}>
          <Query query={queries.songQuery}>
            {({ loading, error, data }) => {
              if (data === undefined) return null;
              if (loading) return 'Loading';
              if (error) return `Error! ${error.message}`;
              return data.songs.map(thisSong => (
                <SongTile
                  key={thisSong.id}
                  song={thisSong}
                  onClick={() => this.playSong(thisSong)}
                />
              ));
            }}
          </Query>
          <Record
            toggleRecord={this.toggleRecord}
            recorder={recorder}
            recording={recording}
          />
        </div>
        <Keyboard
          sampler={sampler}
          keyDown={this.startNote}
          keyUp={this.endNote}
        />
      </div>
    );
  }
}

export default App;
