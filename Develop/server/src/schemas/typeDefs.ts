import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
  } 

  type Menu {
    _id: ID!
    name: String!
    userId: ID!
    items: [MenuItem!]!
    theme: Theme!
  }

  type Theme {
    fontFamily: String!
    primaryColor: String!
    secondaryColor: String!
  }

  type Query {
    me: User
    getMenus: [Menu]
  }

  type Mutation {
    login(username: String!, password: String!): String
    createUser(username: String!, email: String!, password: String!): User
    createMenu(name: String!, userId: ID!, items: [MenuItemInput!]!, theme: ThemeInput!): Menu
  }

  input MenuItemInput {
    name: String!
    description: String!
    price: Float!
    category: String!
  }

  input ThemeInput {
    fontFamily: String!
    primaryColor: String!
    secondaryColor: String!
  }
`;
