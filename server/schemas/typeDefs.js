const typeDefs = `

type User {
    _id: ID!
    username: String!
    email: String!
    bio: String
    avatar: String
    followers: [User]
    reviews: String
    wishlist: [Game]
    currentlyPlaying: [Game]
  }

type Auth {
    token: ID! 
    user: User
}

type Query {
    getPost(postId: ID!): Post
    getAllPosts: [Post!]
    getMyPost: [Post!] 
    comments(postId: ID!): [Comment]
    me: User
}

type Query {
  me: User
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
    gameId: String!
    name: String!
    image: String
    platforms: [String]
    rating: Float
    releaseDate: String
    
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
    createdAt: String!
    updatedAt: String
  } 

  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
    createdAt: String!
    updatedAt: String
  }


  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addToWishlist(gameData: AddToWishlistInput!): User
    addToCurrentlyPlaying(gameData: AddToCurrentlyPlayingInput!): User
    createPost(title: String!, content: String!): Post!
    deletePost(postId: ID!): Post
    updatePost(postId: ID!, content: String!): Post!
    createComment(content: String!, post: ID!): Comment!
    updateComment(id: ID!, content: String!): Comment!
    deleteComment(id: ID!): ID!
}
`

module.exports = typeDefs;
