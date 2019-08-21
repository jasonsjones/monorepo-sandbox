import { gql } from 'apollo-server-express';

export default gql`
    type Query {
        "Fetch all the users"
        users: [User]

        "Fetch a single user with the given id"
        user(id: String): User

        "Fetch the context user"
        me: User

        verifyEmail(token: String): User

        resendEmailVerification: Boolean

        "Fetch the version of the API"
        version: String
    }
`;
