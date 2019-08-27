import { gql } from 'apollo-server-express';

export default gql`
    type Mutation {
        createUser(firstName: String, lastName: String, email: String, password: String): User
        changePassword(password: String!, token: String!): Boolean
        updateUser(id: ID, newUserData: UserInput): User
        deleteUser(id: ID): User
        deleteUserAll: Boolean
    }
`;
