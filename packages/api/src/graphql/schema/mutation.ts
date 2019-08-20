import { gql } from 'apollo-server-express';

export default gql`
    type Mutation {
        createUser(firstName: String, lastName: String, email: String, password: String): User
        updateUser(id: ID, newUserData: UserInput): User
        deleteUser(id: ID): User
        deleteUserAll: Boolean
    }
`;
