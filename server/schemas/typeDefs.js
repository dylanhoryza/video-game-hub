const typeDefs = `

type User {
    _id: ID!
    username: String!
    email: String!
    bio: String
    avatar: String
    followers: [User]
    wishlist: [Game]
    currentlyPlaying: [Game]
  }

type Auth {
    token: ID! 
    user: User
}

type Query {
    me: User
    getPost(postId: ID!): Post
    getAllPosts: [Post!]!
}

type Game {
    gameId: ID!
    name: String!
    image: String
    platforms: [String]
    rating: Float
    releaseDate: String
  }

  input AddToWishlistInput {
    gameId: String!
    name: String!
    image: String
    platforms: [String]
    rating: Float
    releaseDate: String
    
  }
  
  input AddToCurrentlyPlayingInput {
    gameId: ID!
    
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
    createdAt: String!
    updatedAt: String
  } 

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addToWishlist(gameData: AddToWishlistInput!): User
    addToCurrentlyPlaying(input: AddToCurrentlyPlayingInput!): Game
    createPost(title: String!, content: String!, authorId: ID!): Post!
    deletePost(postId: ID!): Post
    updatePost(postId: ID!, content: String!): Post!
}

`;
module.exports = typeDefs;