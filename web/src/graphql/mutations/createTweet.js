import { gql } from 'react-apollo';

export default gql`
  mutation createTweet($text: String!) {
    createTweet(text: $text) {
      _id
      text
      user {
        _id
        avatar
        username
        firstName
        lastName
      }
      favoriteCount
      isFavorited
      createdAt
      updatedAt
    }
  }
`;
