import { gql } from 'apollo-server-express';
import Auth from './auth';
import Mutation from './mutation';
import Query from './query';
import User from './user';

const schema = gql`
    type schema {
        query: Query
        mutation: Mutation
    }
`;

export default [schema, Query, Mutation, User, Auth];
