import request, { Test } from 'supertest';
import { getConnection, getRepository } from 'typeorm';
import app from '../config/app';
import { User } from '../entity/User';
import UserService from '../services/UserService';
import { createDbConnection } from '../utils/createDbConnection';

const makeGraphQLCall = (query: string, variables = {}): Test => {
    return request(app)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .send({ query, variables });
};

beforeAll(() => {
    return createDbConnection();
});

afterAll(async () => {
    const userRepository = await getRepository(User);
    userRepository.clear();
    getConnection().close();
});

describe('Authentication resolver', () => {
    const email = 'oliver@qc.com';
    const password = '123456';
    const query = `
        mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password)
        }
    `;

    beforeAll(() => {
        return UserService.createUser('Oliver', 'Queen', email, password);
    });

    it('logs in a user with the correct credentials', () => {
        const variables = {
            email,
            password
        };

        return makeGraphQLCall(query, variables).then(res => {
            const result = res.body.data.login;
            expect(result).toBe(true);
        });
    });

    it('does not log in a user with a bad password', () => {
        const variables = {
            email,
            password: 'badpassword'
        };

        return makeGraphQLCall(query, variables).then(res => {
            const result = res.body.data.login;
            expect(result).toBe(false);
        });
    });

    it('does not log in a user with an unknown email', () => {
        const variables = {
            email: 'oliver@cityhall.gov',
            password
        };

        return makeGraphQLCall(query, variables).then(res => {
            const result = res.body.data.login;
            expect(result).toBe(false);
        });
    });
});
