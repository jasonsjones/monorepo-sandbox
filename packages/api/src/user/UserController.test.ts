import { expect } from 'chai';

import UserController from './UserController';
import UserStore from './UserStore';

describe('User controller', () => {
    describe('createUser()', () => {
        beforeEach(() => {
            UserStore.clear();
        });

        it('returns a promise', () => {
            const promise = UserController.createUser({
                email: 'me@email.com',
                password: 'test1234'
            });
            expect(promise).to.be.a('promise');
        });

        it('returns a promise that resolves to a user', () => {
            const promise = UserController.createUser({
                email: 'me@email.com',
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
            }).then(() =>
                UserController.createUser({
                    email: 'me2@email.com',
                    password: '1234test'
                })
            );
            expect(promise).to.be.a('promise');
            return promise.then(user => {
                // tslint:disable-next-line
                expect(user).to.be.null;
            });
        });
    });

    describe('getUsers()', () => {
        beforeEach(() => {
            UserStore.clear();
            return UserController.createUser({
                email: 'oliver@qc.com',
                password: 'test1234'
            }).then(() =>
                UserController.createUser({
                    email: 'barry@starlabs.com',
                    password: '1234test'
                })
            );
        });

        after(() => UserStore.clear());

        it('returns a promise', () => {
            const promise = UserController.getUsers();
            expect(promise).to.be.a('promise');
        });

        it('returns a promise that resolves to an array of users', () => {
            const promise = UserController.getUsers();
            expect(promise).to.be.a('promise');
            promise.then(users => {
                expect(users).to.be.an('array');
                expect(users).to.have.length(2);
            });
        });
    });
});
