import { gql } from 'react-apollo';

export default gql`
  subscription {  
    tweetAdded {
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
