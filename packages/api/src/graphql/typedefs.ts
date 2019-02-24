import { gql } from 'apollo-server-express';

export default gql`
    type Query {
        "A simple type for getting started!"
        hello: String
    }
`;
