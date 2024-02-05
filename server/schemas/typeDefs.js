const typeDefs = `

type User {
    _id: ID!
    username: String!
    email: String!
    bio: String
    favoriteGames: [String]

  }

type Auth {
    token: ID! 
    user: User
}

type Query {
    me: User
}

type Mutation {
    createUser(username: String!, email: String!, password: String!, bio: String, favoriteGames: [String]): User
    loginUser(email: String!, password: String!): Auth
    saveFavoriteGame(gameName: String!): User
}

`
module.exports = typeDefs