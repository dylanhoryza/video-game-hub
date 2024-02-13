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
  mutation AddToCurrentlyPlaying($gameData: AddToCurrentlyPlayingInput!) {
    addToCurrentlyPlaying(gameData: $gameData) {
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

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      _id
      content
      createdAt
      title
      author {
        _id
        # Add other fields you may need from the author
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
mutation CreateComment($content: String!, $post: ID!) {
  createComment(content: $content, post: $post) {
    author {
      _id
    }
    content
    createdAt
    id
  }
}
`
export const DELETE_POST = gql`
mutation DeletePost($postId: ID!) {
  deletePost(postId: $postId) {
    _id
    title
    content
  }
}
`
export const DELETE_COMMENT = gql`
mutation DeleteComment($deleteCommentId: ID!) {
  deleteComment(id: $deleteCommentId)
}
`
export const REMOVE_FROM_WISHLIST = gql`
mutation deleteFromWishlist($gameId: ID!) {
  deleteFromWishlist(gameId: $gameId) {
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
`

export const REMOVE_FROM_CURRENTLY_PLAYING = gql`
mutation deleteFromCurrentlyPlaying($gameId: ID!) {
  deleteFromCurrentlyPlaying(gameId: $gameId) {
    _id
    username
    email
    currentlyPlaying {
      gameId
      name
      image
      platforms
      rating
      releaseDate
    }
  }
}
`