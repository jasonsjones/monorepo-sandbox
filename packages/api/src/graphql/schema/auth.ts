import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        "Login a user with email & password"
        login(email: String, password: String): LoginResponse

        "Logout the currently authenticated user"
        logout: Boolean
    }
`;
