import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!, $bio: String, $favoriteGames: [String]) {
    createUser(username: $username, email: $email, password: $password, bio: $bio, favoriteGames: $favoriteGames) {
      _id
      username
      email
      bio
      favoriteGames
    }
  }
`; 

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      username
      email
      bio
      favoriteGames
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
