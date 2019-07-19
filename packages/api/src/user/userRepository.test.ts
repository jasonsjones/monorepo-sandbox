import { Connection } from 'mongoose';
import { dbConnect } from '../config/db';
import * as UserRepository from './userRepository';

describe('User Repository', () => {
    let dbconnection: Connection;
    const OLLIE = {
        name: {
            first: 'Oliver',
            last: 'Queen'
        },
        email: 'oliverUserRepo@qc.com',
        password: '123456'
    };

    const BARRY = {
        name: {
            first: 'Barry',
            last: 'Allen'
        },
        email: 'barryUserRepo@starlabs.com',
        password: '123456'
    };

    beforeAll(async () => {
        dbconnection = dbConnect();
    });

    afterEach(async () => {
        const list = await dbconnection.db.listCollections({ name: 'users' }).toArray();
        if (list.length !== 0) {
            await UserRepository.getModel().collection.drop();
        }
    });

    afterAll(async () => {
        await dbconnection.close();
    });

    it('creates a new user', () => {
        return UserRepository.createUser(OLLIE).then(ollie => {
            expect(ollie).toHaveProperty('_id');
            expect(ollie).toHaveProperty('name');
            expect(ollie).toHaveProperty('password');
            expect(ollie).toHaveProperty('createdAt');
            expect(ollie).toHaveProperty('updatedAt');
        });
    });

    it('gets all the users', () => {
        return UserRepository.createUser(BARRY)
            .then(() => UserRepository.createUser(OLLIE))
            .then(() => UserRepository.getUsers())
            .then(users => {
                const [barry, ollie] = users;
                expect(users).toHaveLength(2);
                expect(barry.email).toBe(BARRY.email);
                expect(ollie.email).toBe(OLLIE.email);
            });
    });

    it('deletes all the users from the collection', () => {
        return UserRepository.createUser(BARRY)
            .then(() => UserRepository.createUser(OLLIE))
            .then(() => UserRepository.getUsers())
            .then(users => expect(users).toHaveLength(2))
            .then(() => UserRepository.deleteUserAll())
            .then(res => UserRepository.getUsers())
            .then(users => expect(users).toHaveLength(0));
    });
});
