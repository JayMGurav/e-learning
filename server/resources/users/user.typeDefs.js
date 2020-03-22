var { gql } = require('apollo-server-express');

// cart: [ID!]
// wishlist: [Course]
//Add this to User

var userTypeDefs = gql`
    scalar Date
    scalar DateTime

    enum Gender {
        MALE
        FEMALE
        OTHERS
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        name: String!
        avatar: String
        dateOfBirth: Date
        gender: Gender
        stripeID: String
        coursesBought: [Course!]
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    input UpdateInputType {
        username: String
        email: String
        name: String
        avatar: String
        dateOfBirth: Date
        gender: Gender
    }

    type Query {
        user(username: String!): User!
        users: [User!]!
        me: User!
    }
    type Mutation {
        signUp(username: String!, email: String!, password: String!): Boolean!
        signIn(email: String!, password: String!): String!
        updateMe(input: UpdateInputType!): User!
        buyCourse(source: String!, coursename: String, courseId: ID): User
    }
`;

module.exports = userTypeDefs;
