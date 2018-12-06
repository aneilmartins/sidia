import { gql } from 'react-apollo';

export default gql`
  query getUser($_id: ID!) {
    getUser(_id: $_id) {
      _id
      avatar
      username
      firstName
      lastName
    }
  }
`;
