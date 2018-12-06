import { gql } from 'react-apollo';

export default gql`
  {
    me {
      _id
      avatar
      username
      firstName
      lastName
    }
  }
`;
