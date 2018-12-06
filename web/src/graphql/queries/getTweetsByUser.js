import { gql } from 'react-apollo';

export default gql`
  query getTweetsByUser($_id: ID!) {
    getTweetsByUser(_id: $_id) {
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
