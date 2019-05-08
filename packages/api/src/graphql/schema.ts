import { gql } from 'apollo-server-express';

export default gql`
    type Query {
        "Fetch all the users"
        users: [User]

        "Fetch a single user with the given id"
        user(id: String): User

        "Fetch the context user"
        me: User

        login(email: String, password: String): LoginResponse

        "Fetch the version of the API"
        version: String
    }

    type Mutation {
        createUser(firstName: String, lastName: String, email: String, password: String): User
        deleteUser(id: String): User
    }

    "A simple User type"
    type User {
        "The unique id for this user generated by MongoDB"
        _id: ID!

        "User's first and last names"
        name: Name

        "User's email address"
        email: String

        "User's password; this will be hashed very soon :-)"
        password: String

        createdAt: String
        updatedAt: String
    }

    type Name {
        first: String
        last: String
    }

    type LoginResponse {
        authUser: User
        token: String
    }
`;