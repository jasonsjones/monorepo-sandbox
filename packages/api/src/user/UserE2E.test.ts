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

/*
const loginQuery = `
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

const loginVariables = {
    email: BARRY.email,
    password: BARRY.password
};
*/

describe('User E2E tests', () => {
    before(() => {
        dbConnect();
    });

    afterEach(async () => {
        await getDbConnection().dropCollection('users');
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
        }).timeout(8000);
    });

    describe.skip('mutation to update a user', () => {
        let id: string;
        before(() => {
            return UserRepository.createUser(BARRY).then(user => {
                id = user._id;
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
                        updatedData: $updatedData
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
            // need to login first before updating user data.
            return request(app)
                .post('/graphql')
                .set('Content-Type', 'application/json')
                .send({ query, variables })
                .then(res => {
                    const { data } = res.body;
                    expect(data.updateUser).to.have.property('name');
                    expect(data.updateUser).to.have.property('email');
                    expect(data.updateUser.name).to.have.property('first');
                    expect(data.updateUser.name).to.have.property('last');
                });
        });
    });
});
