import { gql } from 'react-apollo';


export default gql`
  {
    getTweets {
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
