import request, { Response, Test } from 'supertest';
import { getConnection, getRepository } from 'typeorm';
import app from '../config/app';
import { User } from '../entity/User';
import UserService from '../services/UserService';
import { createDbConnection } from '../utils/createDbConnection';
import TestClient from '../utils/TestClient';

const makeGraphQLCall = (query: string, variables = {}): Test => {
    return request(app)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .send({ query, variables });
};

const verifyHasSingleError = (res: Response): void => {
    const response = res.body;
    expect(response).toHaveProperty('errors');
    expect(response).toHaveProperty('data');
    expect(response.data).toBeNull();
    expect(response.errors).toHaveLength(1);
    expect(response.errors[0].extensions.exception.validationErrors).toHaveLength(1);
};

beforeAll(() => {
    return createDbConnection();
});

afterAll(async () => {
    const userRepository = await getRepository(User);
    userRepository.clear();
    getConnection().close();
});

describe('mutation to create a user', () => {
    const firstName = 'Test';
    const lastName = 'User';
    const email = 'test-user@example.com';
    const password = '123456';
    const query = `
        mutation RegisterUser($input: RegisterInput!) {
            registerUser(input: $input) {
                success
                message
                payload {
                    user {
                        id
                        name
                        email
                    }
                }
            }
        }
    `;

    it('creates a user', () => {
        const variables = {
            input: {
                firstName,
                lastName,
                email,
                password
            }
        };

        return makeGraphQLCall(query, variables)
            .then(res => {
                const json = res.body.data.registerUser;
                expect(json).toHaveProperty('success');
                expect(json).toHaveProperty('message');
                expect(json).toHaveProperty('payload');
                expect(json.success).toBeTruthy();
                expect(json.payload).toHaveProperty('user');
                return User.find({ where: { email } });
            })
            .then(users => {
                const [user] = users;
                expect(users).toHaveLength(1);
                expect(user.email).toEqual(email);
                expect(user.password).not.toEqual(password);
            });
    });

    it('returns an error if the firstName is not long enough', () => {
        const variables = {
            input: {
                firstName: '',
                lastName,
                email: 'oliver2@qc.com',
                password
            }
        };

        return makeGraphQLCall(query, variables).then(verifyHasSingleError);
    });

    it('returns an error if the lastName is not long enough', () => {
        const variables = {
            input: {
                firstName,
                lastName: '',
                email: 'oliver2@qc.com',
                password
            }
        };

        return makeGraphQLCall(query, variables).then(verifyHasSingleError);
    });

    it('returns an error if the email is not valid ', () => {
        const variables = {
            input: {
                firstName,
                lastName,
                email: 'oliver<at>qc.com',
                password
            }
        };

        return makeGraphQLCall(query, variables).then(verifyHasSingleError);
    });

    it('returns an error if the email already exists', () => {
        const variables = {
            input: {
                firstName,
                lastName,
                email,
                password
            }
        };

        return makeGraphQLCall(query, variables).then(verifyHasSingleError);
    });

    it('returns an error if the password is not long enough', () => {
        const variables = {
            input: {
                firstName,
                lastName,
                email: 'weak-password@example.com',
                password: 'ab'
            }
        };

        return makeGraphQLCall(query, variables).then(verifyHasSingleError);
    });

    it('returns multiple errors if the email is not valid and password is not long enough', () => {
        const variables = {
            input: {
                firstName,
                lastName,
                email: 'notvalid<at>example.com',
                password: 'cd'
            }
        };

        return makeGraphQLCall(query, variables).then(res => {
            const response = res.body;
            expect(response).toHaveProperty('errors');
            expect(response).toHaveProperty('data');
            expect(response.data).toBeNull();
            expect(response.errors).toHaveLength(1);
            expect(response.errors[0].extensions.exception.validationErrors).toHaveLength(2);
        });
    });
});

describe('query for allUsers', () => {
    beforeAll(async () => {
        await getConnection().manager.clear(User);
        return UserService.createUser(
            'Test',
            'User1',
            'test-user1@example.com',
            'plaintext'
        ).then(() =>
            UserService.createUser('Test', 'User2', 'test-user2@example.com', 'plaintext')
        );
    });

    it('returns all the users', () => {
        const query = `
            query {
                allUsers {
                    id
                    firstName
                    lastName
                    email
                    isEmailVerified
                    emailVerificationToken
                    createdAt
                }
            }
        `;

        return makeGraphQLCall(query).then(res => {
            const { data } = res.body;
            expect(data.allUsers).toHaveLength(2);
            const firstUser = data.allUsers[0];
            expect(firstUser).toHaveProperty('id');
            expect(firstUser).toHaveProperty('email');
            expect(firstUser).toHaveProperty('firstName');
            expect(firstUser).toHaveProperty('lastName');
            expect(firstUser).toHaveProperty('isEmailVerified');
            expect(firstUser).toHaveProperty('emailVerificationToken');
            expect(firstUser).toHaveProperty('createdAt');
        });
    });
});

describe('query for me', () => {
    it('returns the context user', async () => {
        const email = 'oliver@qc.com';
        const client = new TestClient(app);
        await client.createUser('Oliver', 'Queen', email, '123456');
        await client.login(email, '123456');
        const response = await client.getMe();
        const { data, errors } = response.body;
        expect(errors).toBeUndefined();
        expect(data.me).toHaveProperty('id');
        expect(data.me).toHaveProperty('email');
        expect(data.me).toHaveProperty('name');
        expect(data.me.email).toEqual(email);
    });
});

describe('mutation to request a password reset', () => {
    const testUserEmail = 'test-user@example.com';

    beforeAll(async () => {
        await getConnection().manager.clear(User);
        return UserService.createUser('Test', 'User', testUserEmail, 'plaintext');
    });

    it('adds a password reset token', async () => {
        const client = new TestClient(app);
        const response = await client.resetPassword(testUserEmail);
        const { data, errors } = response.body;
        const { success, message, payload } = data.resetPassword;

        expect(errors).toBeUndefined();
        expect(data.resetPassword.success).toBe(true);
        expect(success).toBe(true);
        expect(message.length).toBeGreaterThan(0);
        expect(payload.user).toHaveProperty('passwordResetToken');
        expect(payload.user.passwordResetToken.length).toBeGreaterThan(0);
    });

    it('adds a timestamp when the password reset token expires', async () => {
        const now = new Date();
        const client = new TestClient(app);
        const response = await client.resetPassword(testUserEmail);
        const { data, errors } = response.body;
        const { success, message, payload } = data.resetPassword;

        expect(errors).toBeUndefined();
        expect(success).toBe(true);
        expect(message.length).toBeGreaterThan(0);
        expect(payload.user).toHaveProperty('passwordResetTokenExpiresAt');
        expect(payload.user.passwordResetTokenExpiresAt.length).toBeGreaterThan(0);
        expect(/^2020/.test(payload.user.passwordResetTokenExpiresAt)).toBe(true);
        expect(new Date(payload.user.passwordResetTokenExpiresAt) > now).toBe(true);
    });

    it('does NOT generate token when given an unknown email', async () => {
        const client = new TestClient(app);
        const response = await client.resetPassword('unknownEmail@example.com');
        const { data } = response.body;
        const { success, message, payload } = data.resetPassword;
        expect(success).toBe(false);
        expect(message).toBe('invalid email');
        expect(payload.user).toBeNull();
    });

    describe('mutation to change password', () => {
        const testUserEmail = 'test-user@example.com';

        beforeAll(async () => {
            await getConnection().manager.clear(User);
            return UserService.createUser('Test', 'User1', testUserEmail, 'plaintext');
        });

        it("changes a user's password when provided a valid reset token", async () => {
            const client = new TestClient(app);
            const resetResponse = await client.resetPassword(testUserEmail);
            const resetPayload = resetResponse.body.data.resetPassword.payload;
            const resetToken = resetPayload.user.passwordResetToken;
            const origUser = await User.findOne({ where: { email: testUserEmail } });
            const origPassword = origUser?.password;

            const response = await client.changePassword(resetToken, 'newPassword1234');

            const { data } = response.body;
            const { success, message } = data.changePassword;
            const updatedUser = await User.findOne({ where: { email: testUserEmail } });
            const newPassword = updatedUser?.password;

            expect(success).toBe(true);
            expect(message.length).toBeGreaterThan(0);
            expect(newPassword).not.toBe(origPassword);
        });

        it("does NOT change a user's password when provided an invalid reset token", async () => {
            const expectedMessage = 'reset token not valid for user';
            const invalidToken = '98f90fae-9626-4077-8ca4-761e3d24aab1';
            const client = new TestClient(app);
            const response = await client.changePassword(invalidToken, 'newPassword1234');
            const { data } = response.body;
            const { success, message } = data.changePassword;
            expect(success).toBe(false);
            expect(message.length).toBeGreaterThan(0);
            expect(expectedMessage).toBe(message);
        });

        it.skip("does NOT change a user's password when provided an expired reset token", async () => {
            const client = new TestClient(app);
            const resetResponse = await client.resetPassword(testUserEmail);
            const resetPayload = resetResponse.body.data.resetPassword.payload;
            const resetToken = resetPayload.user.passwordResetToken;

            // need to determine how to best mock/stub the current time.  Need to fast forward 2+ hours for
            // token to expire
            const response = await client.changePassword(resetToken, 'newPassword1234');
            const { data } = response.body;
            const { success, message } = data.changePassword;

            expect(success).toBe(true);
            expect(message.length).toBeGreaterThan(0);
        });
    });
});
