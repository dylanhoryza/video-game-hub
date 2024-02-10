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
export const GET_COMMENTS = gql`
query GetComments($postId: ID!) {
  comments(postId: $postId) {
    author {
      _id
      email
      username
    }
    content
    createdAt
    id
    post {
      _id
      author {
        _id
        email
        username
      }
      content
      createdAt
      title
    }
  }
}
`;
