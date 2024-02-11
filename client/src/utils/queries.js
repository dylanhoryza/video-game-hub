import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      _id
      username
      email
      bio
      wishlist {
        _id
        name
        gameId
        image
        platforms
        rating
        releaseDate
      }
    }
  }
`;

export const QUERY_ME = gql`
{
  me {
    _id
    username
    email
    bio
    avatar
    followers
    reviews
    wishlist {
      _id
      name
      gameId
      image
      platforms
      rating
      releaseDate
    }
    currentlyplaying
  }
}
`

export const GET_ALL_POSTS = gql`
query GetAllPosts {
  getAllPosts {
    _id
    title
    content
    author {
      username
    }
    createdAt
    updatedAt
  }
}
`
export const GET_COMMENTS_BY_POST_ID = gql`
  query GetCommentsByPostId($postId: ID!) {
    comments(postId: $postId) {
      id
      content
      createdAt
      updatedAt
      author {
        _id
        username
      }
    }
  }
`;

