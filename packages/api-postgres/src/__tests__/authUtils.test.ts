import { getConnection, getRepository } from 'typeorm';
import { User } from '../entity/User';
import { generateToken, verifyToken } from '../modules/auth/authUtils';
import { createDbConnection } from '../utils/createDbConnection';
import UserService from '../services/UserService';

beforeAll(() => {
    return createDbConnection();
});

afterAll(async () => {
    const userRepository = await getRepository(User);
    userRepository.clear();
    getConnection().close();
});

describe('Auth util', () => {
    let token: string;
    let user: User;

    beforeAll(() => {
        return UserService.createUser('John', 'Diggle', 'dig@qc.com', '123456').then(
            dig => (user = dig)
        );
    });

    it('generates a json web token', () => {
        token = generateToken(user);
        const parts = token.split('.');

        expect(token).toBeDefined();
        expect(parts).toHaveLength(3);
    });

    it('verifies a json web token', () => {
        const token = generateToken(user);
        const tokenPayload = verifyToken(token);
        expect(tokenPayload).toHaveProperty('id');
        expect(tokenPayload).toHaveProperty('email');
        expect(tokenPayload).toHaveProperty('iat');
        expect(tokenPayload).toHaveProperty('exp');
    });

    it('throws error when provided a bad json web token', () => {
        const badToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
            '.eyJpZCI6IjVkNmJmYjM5OThjMGY3NjZhMWZlYWY3ZCIsImVtYWlsIjoib2xpdmVyVXNlclHlcG9AcWMuY29tIiwiaWF0IjoxNTY3MzU3NzUzLCJleHAiOjE1NjczNjEzNTN9' +
            '.kWHbt2JlocPcOsCvjXfCL9tAuOIE_K2L4bsKQ9dQRM4';
        expect(() => {
            verifyToken(badToken);
        }).toThrow();
    });
});
