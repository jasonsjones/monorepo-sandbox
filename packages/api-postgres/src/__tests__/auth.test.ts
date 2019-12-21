import request, { Test } from 'supertest';
import { getConnection, getRepository } from 'typeorm';
import app from '../config/app';
import { User } from '../entity/User';
import UserService from '../services/UserService';
import { createDbConnection } from '../utils/createDbConnection';
import TestClient from '../utils/TestClient';

const makeGraphQLCall = (query: string, variables = {}): Test => {
    return request(app)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .send({ query, variables });
};

const verifyInvalidUser = (res: request.Response): void => {
    const result = res.body;
    expect(result).toHaveProperty('errors');
    expect(result).toHaveProperty('data');
    expect(result.data).toBeNull();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toHaveProperty('message');
    expect(result.errors[0].message).toEqual('invalid user credentials');
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

    beforeAll(() => {
        return UserService.createUser('Oliver', 'Queen', email, password);
    });

    describe('login mutation', () => {
        const query = `
            mutation Login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    accessToken
                }
            }
        `;

        it('logs in a user with the correct credentials', () => {
            const variables = {
                email,
                password
            };

            return makeGraphQLCall(query, variables).then(res => {
                const result = res.body.data.login;
                expect(result).toHaveProperty('accessToken');
                expect(typeof result.accessToken).toBe('string');
            });
        });

        it('does not log in a user with a bad password', () => {
            const variables = {
                email,
                password: 'badpassword'
            };

            return makeGraphQLCall(query, variables).then(verifyInvalidUser);
        });

        it('does not log in a user with an unknown email', () => {
            const variables = {
                email: 'oliver@cityhall.gov',
                password
            };

            return makeGraphQLCall(query, variables).then(verifyInvalidUser);
        });
    });

    describe('logout mutation', () => {
        it('removes the refresh token cookie', async () => {
            let refreshToken: string;
            const client = new TestClient(app);
            await client.login(email, password);
            refreshToken = await client.getRefreshToken();
            expect(refreshToken.length).toBeGreaterThan(0);

            await client.logout();

            refreshToken = await client.getRefreshToken();
            expect(refreshToken).toBe('');
        });
    });

    describe('confirmEmail mutation', () => {
        it('changes email verification fields for the user', async () => {
            const client = new TestClient(app);
            const user = await UserService.getUserByProperty('email', email);
            const token = user?.emailVerificationToken;
            expect((token as string).length).toBeGreaterThan(0);
            expect(user?.isEmailVerified).toBe(false);

            const res = await client.confirmEmail(token as string);

            expect(res.body).toHaveProperty('data');
            expect(res.body).not.toHaveProperty('errors');
            const updatedUser = res.body.data.confirmEmail.payload.user;
            expect(updatedUser.isEmailVerified).toBe(true);
            expect(updatedUser.emailVerificationToken).toBe('');
        });
    });
});

describe('REST endpoint for refeshing access token', () => {
    it('does not refresh access token if there is no refresh token', () => {
        return request(app)
            .get('/api/refreshtoken')
            .then(res => {
                const json = res.body;
                expect(json).toHaveProperty('success');
                expect(json).toHaveProperty('message');
                expect(json).toHaveProperty('payload');
                expect(json.payload).toHaveProperty('accessToken');
                expect(json.success).toEqual(true);
                expect(json.payload.accessToken).toEqual('');
            });
    });

    it('does not refresh access token if refresh token is invalid', () => {
        return request(app)
            .get('/api/refreshtoken')
            .set('Cookie', ['qid=sending.malformed.token'])
            .then(res => {
                const json = res.body;
                expect(json).toHaveProperty('success');
                expect(json).toHaveProperty('message');
                expect(json).toHaveProperty('payload');
                expect(json.payload).toHaveProperty('accessToken');
                expect(json.success).toEqual(true);
                expect(json.payload.accessToken).toEqual('');
            });
    });
});
