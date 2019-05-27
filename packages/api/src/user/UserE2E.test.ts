import { expect } from 'chai';
import request from 'supertest';
import app from '../config/app';
import { dbConnect, getDbConnection } from '../config/db';

describe('User E2E tests', () => {
    const ollie = {
        firstName: 'Oliver',
        lastName: 'Queen',
        email: 'oliver@qc.com',
        password: '123456'
    };

    before(() => {
        dbConnect();
    });

    afterEach(async () => {
        await getDbConnection().dropCollection('users');
    });

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
            firstName: ollie.firstName,
            lastName: ollie.lastName,
            email: ollie.email,
            password: ollie.password
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
