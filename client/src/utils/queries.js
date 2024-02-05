import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      _id
      username
      email
      bio
      favoriteGames
    }
  }
`;
