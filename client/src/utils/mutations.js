import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      email
      username
    }
  }
}
`; 

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      email
      username
      _id
    }
  }
}
`;

export const SAVE_FAVORITE_GAME = gql`
  mutation SaveFavoriteGame($userId: ID!, $gameName: String!) {
    saveFavoriteGame(userId: $userId, gameName: $gameName) {
      _id
      username
      email
      bio
      favoriteGames
    }
  }
`;
