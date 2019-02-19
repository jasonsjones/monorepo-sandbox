import { expect } from 'chai';

import UserController from './UserController';

describe('User controller', () => {
    describe('createUser()', () => {
        it('returns a promise', () => {
            const promise = UserController.createUser({
                email: 'me@email.com',
                password: 'test1234'
            });
            expect(promise).to.be.a('promise');
        });

        it('returns a promise that resolves to a user', () => {
            const promise = UserController.createUser({
                email: 'me2@email.com',
                password: 'test1234'
            });
            expect(promise).to.be.a('promise');
            return promise.then(user => {
                expect(user).to.have.property('_id');
                expect(user).to.have.property('email');
            });
        });

        it('returns a promise that resolves to null if email exists', () => {
            const promise = UserController.createUser({
                email: 'me2@email.com',
                password: 'test1234'
            });
            expect(promise).to.be.a('promise');
            return promise.then(user => {
                // tslint:disable-next-line
                expect(user).to.be.null;
            });
        });
    });
});
