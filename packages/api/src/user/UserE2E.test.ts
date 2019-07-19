import request from 'supertest';
import { generateToken } from '../auth/authUtils';
import app from '../config/app';
import { dbConnect, getDbConnection } from '../config/db';
import * as UserRepository from '../user/userRepository';

const OLLIE = {
    name: {
        first: 'Oliver',
        last: 'Queen'
    },
    email: 'oliver@qc.com',
    password: '123456'
};

const BARRY = {
    name: {
        first: 'Barry',
        last: 'Allen'
    },
    email: 'barry@qc.com',
    password: '123456'
};

describe('User E2E tests', () => {
    beforeAll(() => {
        dbConnect();
    });

    afterEach(async () => {
        const connection = await getDbConnection();
        const list = await connection.db.listCollections({ name: 'users' }).toArray();
        if (list.length !== 0) {
            await UserRepository.getModel().collection.drop();
        }
    });

    describe('mutation to create a user', () => {
        it('creates a user', () => {
            jest.setTimeout(8000);
            const query = `
                mutation CreateUser(
                    $firstName: String!,
                    $lastName: String!,
                    $email: String!,
                    $password: String!
                ) {
                    createUser(
                        firstName: $firstName,
                        lastName: $lastName,
                        email: $email,
                        password: $password
                    ) {
                        authUser {
                            _id
                            name {
                                first
                                last
                            }
                            email
                            password
                        }
                        token
                    }
                }
            `;

            const variables = {
                firstName: OLLIE.name.first,
                lastName: OLLIE.name.last,
                email: OLLIE.email,
                password: OLLIE.password
            };

            return request(app)
                .post('/graphql')
                .set('Content-Type', 'application/json')
                .send({ query, variables })
                .then(res => {
                    const { data } = res.body;
                    expect(data.createUser).toHaveProperty('authUser');
                    expect(data.createUser).toHaveProperty('token');
                    expect(typeof data.createUser.authUser).toBe('object');
                    expect(typeof data.createUser.token).toBe('string');

                    expect(data.createUser.authUser).toHaveProperty('name');
                    expect(data.createUser.authUser).toHaveProperty('email');
                    expect(data.createUser.authUser).toHaveProperty('password');
                    expect(data.createUser.authUser.name).toHaveProperty('first');
                    expect(data.createUser.authUser.name).toHaveProperty('last');
                });
        });
    });

    describe('mutation to update a user', () => {
        let id: string;
        let token: string;

        beforeAll(() => {
            return UserRepository.createUser(BARRY).then(user => {
                id = user._id;
                token = generateToken(user);
            });
        });

        it('updates a user', () => {
            const query = `
                mutation UpdateUser(
                    $id: ID!,
                    $updatedData: UserInput!
                ) {
                    updateUser(
                        id: $id,
                        newUserData: $updatedData
                    ) {
                        _id
                        name {
                            first
                            last
                        }
                        email
                    }
                }
            `;

            const variables = {
                id,
                updatedData: {
                    name: {
                        first: 'Flash',
                        last: 'Allen'
                    },
                    email: 'barry@starlabs.com'
                }
            };

            return request(app)
                .post('/graphql')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({ query, variables })
                .then(res => {
                    const { updateUser } = res.body.data;
                    expect(updateUser).toHaveProperty('name');
                    expect(updateUser).toHaveProperty('email');
                    expect(updateUser.name).toHaveProperty('first');
                    expect(updateUser.name).toHaveProperty('last');
                    expect(updateUser.name.first).toBe('Flash');
                    expect(updateUser.name.last).toBe('Allen');
                });
        });
    });

    describe('query for user login', () => {
        beforeAll(() => {
            return UserRepository.createUser(BARRY);
        });

        it('returns the authorized user and token', () => {
            const doLogin = (email: string, password: string) => {
                const query = `
                    query Login($email: String!, $password: String!) {
                        login(email: $email, password: $password) {
                            authUser {
                                _id,
                                name {
                                    first
                                    last
                                }
                                email
                            }
                            token
                        }
                    }
                `;

                const variables = {
                    email,
                    password
                };

                const response = request(app)
                    .post('/graphql')
                    .set('Content-Type', 'application/json')
                    .send({ query, variables });
                return response;
            };

            return doLogin(BARRY.email, BARRY.password).then(res => {
                const { data } = res.body;
                expect(data.login).toHaveProperty('authUser');
                expect(data.login).toHaveProperty('token');
                expect(typeof data.login.authUser).toBe('object');
                expect(typeof data.login.token).toBe('string');
            });
        });
    });

    describe('query to get users', () => {
        let token: string;

        beforeAll(() => {
            return UserRepository.createUser(BARRY).then(barry => (token = generateToken(barry)));
        });

        it('gets all the users', () => {
            jest.setTimeout(5000);
            const getUsersQuery = `
                query {
                    users {
                        name {
                            first
                            last
                        }
                        email
                        createdAt
                    }
                }
            `;
            return request(app)
                .post('/graphql')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({ query: getUsersQuery })
                .then(userRes => {
                    const { users } = userRes.body.data;
                    expect(Array.isArray(users)).toBeTruthy();
                    expect(users).toHaveLength(1);
                });
        });
    });
});
