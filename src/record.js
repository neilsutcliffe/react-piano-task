import React, { Component } from 'react';
import RecordButton from './tile/recordTile'
import { Mutation } from 'react-apollo'
import queries from './gql'
import Modal from './modal'

export default class extends Component {
    constructor() {
        super();
        this.state = { displayModal: false }
    }
    toggleModal = () => {
        this.setState({ displayModal: !this.state.displayModal })
    }
    render() {
        const { recording, toggleRecord, recorder } = this.props

        return (

            <Mutation
                mutation={queries.songSave}
                refetchQueries={[{ query: queries.songQuery }]} >
                {(addSong, { loading, error }) => {

                    const stop = () => {
                        if (recorder.Get().length > 0) this.toggleModal();
                        else toggleRecord();
                    }

                    const discard = () => {
                        toggleRecord();
                        recorder.Clear();
                        this.toggleModal();
                    }

                    const save = (title) => {
                        let notes = recorder.Get()

                        if (notes.length > 0) {
                            let song = {
                                title,
                                notes: JSON.stringify(notes)
                            };

                            // Send to GraphQL
                            addSong({ variables: { song } })
                        }

                        recorder.Clear();
                        toggleRecord();
                        this.toggleModal();
                    }
                    if (this.state.displayModal) return <Modal save={save} discard={discard} />

                    // Otherwise return the button
                    return recording ? <RecordButton recording={true} onClick={stop} /> : <RecordButton recording={false} onClick={toggleRecord} />
                }}

            </Mutation >
        )
    }
}
