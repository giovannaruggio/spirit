const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    cocktails: [Cocktail]!
  }

  type Cocktail {
    _id: ID
    name: String
    instructions: String
    image: String
    isAlchoholic: Boolean
    ingredients: [Ingredient]!
  }

  type Ingredient {
    _id: ID
    ingredient: String
    measure: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    cocktails(username: String): [Cocktail]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addCocktail(name: String!, instructions: String!, image: String!, isAlchoholic: Boolean!, ingredients: [Ingredient]!): Cocktail
    saveCocktail(cocktailId: ID!): User
  }
`;

module.exports = typeDefs;
