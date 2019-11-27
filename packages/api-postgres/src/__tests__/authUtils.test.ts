import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { getConnection, getRepository } from 'typeorm';
import { User } from '../entity/User';
import {
    createAccessToken,
    verifyAccessToken,
    createRefreshToken,
    verifyRefreshToken
} from '../modules/auth/authUtils';
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

    it('generates an access  token', () => {
        token = createAccessToken(user);
        const parts = token.split('.');

        expect(token).toBeDefined();
        expect(parts).toHaveLength(3);
    });

    it('generates a refresh token', () => {
        token = createRefreshToken(user);
        const parts = token.split('.');

        expect(token).toBeDefined();
        expect(parts).toHaveLength(3);
    });

    it('verifies an access token', () => {
        const token = createAccessToken(user);
        const tokenPayload = verifyAccessToken(token);

        expect(tokenPayload).toHaveProperty('id');
        expect(tokenPayload).toHaveProperty('email');
        expect(tokenPayload).toHaveProperty('iat');
        expect(tokenPayload).toHaveProperty('exp');
    });

    it('verifies a refresh token', () => {
        const token = createRefreshToken(user);
        const tokenPayload = verifyRefreshToken(token);

        expect(tokenPayload).toHaveProperty('id');
        expect(tokenPayload).toHaveProperty('email');
        expect(tokenPayload).toHaveProperty('iat');
        expect(tokenPayload).toHaveProperty('exp');
    });

    // Given the implementation, the following tests do not add much value, but are here for reference
    it('throws error when provided token with invalid signature', () => {
        const spy = jest.spyOn(jwt, 'verify').mockImplementation(() => {
            throw new JsonWebTokenError('invalid signature');
        });
        const badToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
            '.eyJpZCI6IjVkNmJmYjM5OThjMGY3NjZhMWZlYWY3ZCIsImVtYWlsIjoib2xpdmVyVXNlclHlcG9AcWMuY29tIiwiaWF0IjoxNTY3MzU3NzUzLCJleHAiOjE1NjczNjEzNTN9' +
            '.kWHbt2JlocPcOsCvjXfCL9tAuOIE_K2L4bsKQ9dQRM4';
        expect(() => {
            verifyAccessToken(badToken);
            spy.mockRestore();
        }).toThrow('invalid signature');
    });

    it('throws error when provided malformed token', () => {
        const spy = jest.spyOn(jwt, 'verify').mockImplementation(() => {
            throw new JsonWebTokenError('jwt malformed');
        });
        expect(() => {
            verifyAccessToken('malformedtoken');
            spy.mockRestore();
        }).toThrow('jwt malformed');
    });

    it('throws error when provided token has expired', () => {
        const spy = jest.spyOn(jwt, 'verify').mockImplementation(() => {
            throw new TokenExpiredError('jwt expired', new Date(Date.now() - 1000 * 60 * 20));
        });
        expect(() => {
            verifyAccessToken('expired.token');
            spy.mockRestore();
        }).toThrow('jwt expired');
    });
});
