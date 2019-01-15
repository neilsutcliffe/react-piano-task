import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import RecordButton from './tile/recordTile';
import queries from './gql';
import TitleModal from './titleModal';

export default class extends Component {
  constructor() {
    super();
    this.state = { displayModal: false };
  }

  toggleModal = () => {
    const { displayModal } = this.state;
    this.setState({ displayModal: !displayModal });
  };

  render() {
    const { recording, toggleRecord, recorder } = this.props;
    const { displayModal } = this.state;

    return (
      <Mutation
        mutation={queries.songSave}
        refetchQueries={[{ query: queries.songQuery }]}
      >
        {addSong => {
          const stop = () => {
            if (recorder.Get().length > 0) this.toggleModal();
            else toggleRecord();
          };

          const discard = () => {
            toggleRecord();
            recorder.Clear();
            this.toggleModal();
          };

          const save = title => {
            const notes = recorder.Get();

            if (notes.length > 0) {
              const song = {
                title,
                notes: JSON.stringify(notes)
              };

              // Send to GraphQL
              addSong({ variables: { song } });
            }

            recorder.Clear();
            toggleRecord();
            this.toggleModal();
          };
          if (displayModal) return <TitleModal save={save} discard={discard} />;

          // Otherwise return the button
          return recording ? (
            <RecordButton recording onClick={stop} />
          ) : (
            <RecordButton recording={false} onClick={toggleRecord} />
          );
        }}
      </Mutation>
    );
  }
}
