import User from '../user/userModel';
import { generateRandomToken, generateToken, verifyToken } from './authUtils';

const OLLIE = {
    name: {
        first: 'Oliver',
        last: 'Queen'
    },
    email: 'oliverUserRepo@qc.com',
    password: '123456'
};

describe('Auth utilities', () => {
    const oliver = new User(OLLIE);

    it('generates a json web token', () => {
        const token = generateToken(oliver);
        expect(typeof token).toBe('string');
        expect(token).toMatch(/(\w+)\.(\w+)\.(\w+)/);
        expect(token.startsWith('eyJhb')).toBeTruthy();
    });

    it('verifies a json web token', () => {
        const token = generateToken(oliver);
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

    it('generates a 40 char random token', () => {
        const random = generateRandomToken();
        expect(typeof random).toBe('string');
        expect(random).toHaveLength(40);
    });
});
