import request, { Test, Response } from 'supertest';
import { getConnection, getRepository } from 'typeorm';
import app from '../config/app';
import { User } from '../entity/User';
import { createDbConnection } from '../utils/createDbConnection';
import UserService from '../services/UserService';

const makeGraphQLCall = (query: string, variables = {}): Test => {
    return request(app)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .send({ query, variables });
};

const verifyHasSingleError = (res: Response): void => {
    const response = res.body;
    expect(response).toHaveProperty('errors');
    expect(response).toHaveProperty('data');
    expect(response.data).toBeNull();
    expect(response.errors).toHaveLength(1);
    expect(response.errors[0].extensions.exception.validationErrors).toHaveLength(1);
};

beforeAll(() => {
    return createDbConnection();
});

afterAll(async () => {
    const userRepository = await getRepository(User);
    userRepository.clear();
    getConnection().close();
});

describe('mutation to create a user', () => {
    const firstName = 'Test';
    const lastName = 'User';
    const email = 'test-user@example.com';
    const password = '123456';
    const query = `
        mutation RegisterUser($input: RegisterInput!) {
            registerUser(input: $input) {
                success
                message
                payload {
                    user {
                        id
                        name
                        email
                    }
                }
            }
        }
    `;

    it('creates a user', () => {
        const variables = {
            input: {
                firstName,
                lastName,
                email,
                password
            }
        };

        return makeGraphQLCall(query, variables)
            .then(res => {
                const json = res.body.data.registerUser;
                expect(json).toHaveProperty('success');
                expect(json).toHaveProperty('message');
                expect(json).toHaveProperty('payload');
                expect(json.success).toBeTruthy();
                expect(json.payload).toHaveProperty('user');
                return User.find({ where: { email } });
            })
            .then(users => {
                const [user] = users;
                expect(users).toHaveLength(1);
                expect(user.email).toEqual(email);
                expect(user.password).not.toEqual(password);
            });
    });

    it('returns an error if the firstName is not long enough', () => {
        const variables = {
            input: {
                firstName: '',
                lastName,
                email: 'oliver2@qc.com',
                password
            }
        };

        return makeGraphQLCall(query, variables).then(verifyHasSingleError);
    });

    it('returns an error if the lastName is not long enough', () => {
        const variables = {
            input: {
                firstName,
                lastName: '',
                email: 'oliver2@qc.com',
                password
            }
        };

        return makeGraphQLCall(query, variables).then(verifyHasSingleError);
    });

    it('returns an error if the email is not valid ', () => {
        const variables = {
            input: {
                firstName,
                lastName,
                email: 'oliver<at>qc.com',
                password
            }
        };

        return makeGraphQLCall(query, variables).then(verifyHasSingleError);
    });

    it('returns an error if the email already exists', () => {
        const variables = {
            input: {
                firstName,
                lastName,
                email,
                password
            }
        };

        return makeGraphQLCall(query, variables).then(verifyHasSingleError);
    });

    it('returns an error if the password is not long enough', () => {
        const variables = {
            input: {
                firstName,
                lastName,
                email: 'weak-password@example.com',
                password: 'ab'
            }
        };

        return makeGraphQLCall(query, variables).then(verifyHasSingleError);
    });

    it('returns multiple errors if the email is not valid and password is not long enough', () => {
        const variables = {
            input: {
                firstName,
                lastName,
                email: 'notvalid<at>example.com',
                password: 'cd'
            }
        };

        return makeGraphQLCall(query, variables).then(res => {
            const response = res.body;
            expect(response).toHaveProperty('errors');
            expect(response).toHaveProperty('data');
            expect(response.data).toBeNull();
            expect(response.errors).toHaveLength(1);
            expect(response.errors[0].extensions.exception.validationErrors).toHaveLength(2);
        });
    });
});

describe('query for allUsers', () => {
    beforeAll(async () => {
        await getConnection().manager.clear(User);
        return UserService.createUser(
            'Test',
            'User1',
            'test-user1@example.com',
            'plaintext'
        ).then(() =>
            UserService.createUser('Test', 'User2', 'test-user2@example.com', 'plaintext')
        );
    });

    it('returns all the users', () => {
        const query = `
            query {
                allUsers {
                    id
                    firstName
                    lastName
                    email
                    isEmailVerified
                    emailVerificationToken
                    createdAt
                }
            }
        `;

        return makeGraphQLCall(query).then(res => {
            const { data } = res.body;
            expect(data.allUsers).toHaveLength(2);
            const firstUser = data.allUsers[0];
            expect(firstUser).toHaveProperty('id');
            expect(firstUser).toHaveProperty('email');
            expect(firstUser).toHaveProperty('firstName');
            expect(firstUser).toHaveProperty('lastName');
            expect(firstUser).toHaveProperty('isEmailVerified');
            expect(firstUser).toHaveProperty('emailVerificationToken');
            expect(firstUser).toHaveProperty('createdAt');
        });
    });
});
