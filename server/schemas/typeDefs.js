const typeDefs = `

type User {
    _id: ID!
    username: String!
    email: String!
  }

type Auth {
    token: ID! 
    user: User
}

type Query {
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveFavoriteGame(gameName: String!): User
}

`
module.exports = typeDefs