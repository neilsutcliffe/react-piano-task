import gql from 'graphql-tag';

const songQuery = gql`
  {
    songs {
      id
      title
      notes
    }
  }
`;
const songSave = gql`
  mutation addSong($song: SongInput!) {
    addSong(input: $song) {
      id
      notes
      title
    }
  }
`;

export default {
  songQuery,
  songSave
};
