import { expect } from 'chai';
import { Application } from 'express';
import request from 'supertest';
import AppProvider from '../config/AppProvider';
import DatabaseManager from '../config/DatabaseManager';

describe('User E2E tests', () => {
    const ollie =
        'firstName: "Oliver", lastName: "Queen", email: "oliver@qc.com", password: "123456"';
    let app: Application;

    before(async () => {
        app = await AppProvider.getInstance();
    });

    afterEach(async () => {
        await DatabaseManager.getDbConnection().dropCollection('users');
    });

    it('creates a user', () => {
        const query = `mutation {
            createUser( ${ollie} ) {
                _id
                name {
                    first
                    last
                }
                email
                password
            }
        }`;
        return request(app)
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .send({ query })
            .then(res => {
                const data = res.body.data;
                expect(data.createUser).to.have.property('name');
                expect(data.createUser).to.have.property('email');
                expect(data.createUser).to.have.property('password');
                expect(data.createUser.name).to.have.property('first');
                expect(data.createUser.name).to.have.property('last');
            });
    }).timeout(10000);
});
