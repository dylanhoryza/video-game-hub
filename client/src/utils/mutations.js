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

export const ADD_TO_WISHLIST = gql`
  mutation addToWishlist($gameData: AddToWishlistInput!) {
    addToWishlist(gameData: $gameData) {
      _id
      username
      email
      wishlist {
        gameId
        name
        image
        platforms
        rating
        releaseDate
      }
      
      
    }
  }
`;

export const ADD_TO_CURRENTLY_PLAYING = gql`
  mutation AddToCurrentlyPlaying($gameId: ID!) {
    addToCurrentlyPlaying(input: { gameId: $gameId }) {
      _id
      name
      image
      platforms
      rating
      releaseDate
      
    }
  }
`;
