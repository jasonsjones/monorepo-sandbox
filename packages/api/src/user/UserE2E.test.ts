import { expect } from 'chai';
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
    before(() => {
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
                        _id
                        name {
                            first
                            last
                        }
                        email
                        password
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
                    expect(data.createUser).to.have.property('name');
                    expect(data.createUser).to.have.property('email');
                    expect(data.createUser).to.have.property('password');
                    expect(data.createUser.name).to.have.property('first');
                    expect(data.createUser.name).to.have.property('last');
                });
        }).timeout(8000);
    });

    describe('mutation to update a user', () => {
        let id: string;
        let token: string;

        before(() => {
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
                    expect(updateUser).to.have.property('name');
                    expect(updateUser).to.have.property('email');
                    expect(updateUser.name).to.have.property('first');
                    expect(updateUser.name).to.have.property('last');
                    expect(updateUser.name.first).to.equal('Flash');
                    expect(updateUser.name.last).to.equal('Allen');
                });
        });
    });

    describe('query for user login', () => {
        before(() => {
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
                expect(data.login.authUser).to.be.an('object');
                expect(data.login.token).to.be.a('string');
            });
        });
    });

    describe('query to get users', () => {
        let token: string;

        before(() => {
            return UserRepository.createUser(BARRY).then(barry => (token = generateToken(barry)));
        });

        it('gets all the users', () => {
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
                    expect(users).to.be.an('array');
                    expect(users).to.have.length(1);
                });
        }).timeout(5000);
    });
});
