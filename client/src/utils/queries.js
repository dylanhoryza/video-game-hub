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