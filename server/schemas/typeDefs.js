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
}

type Game {
    _id: ID!
    name: String!
    image: String
    platforms: [String]
    rating: Float
    releaseDate: String
  }

  input AddToWishlistInput {
    gameId: ID!
    
  }
  
  input AddToCurrentlyPlayingInput {
    gameId: ID!
    
  }

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addToWishlist(input: AddToWishlistInput!): Game
    addToCurrentlyPlaying(input: AddToCurrentlyPlayingInput!): Game
}

`;
module.exports = typeDefs;
