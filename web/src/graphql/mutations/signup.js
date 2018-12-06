import { gql } from 'react-apollo';

export default gql`
  mutation signup(
    $fullName: String!
    $username: String!
    $email: String!
    $password: String!
    $avatar: String
  ) {
    signup(
      fullName: $fullName
      username: $username
      email: $email
      password: $password
      avatar: $avatar
    ) {
      token
    }
  }
`;
