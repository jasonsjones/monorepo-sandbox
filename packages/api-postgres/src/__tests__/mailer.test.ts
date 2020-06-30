import { getConnection } from 'typeorm';
import UserService from '../services/UserService';
import Mailer from '../services/mailer/Mailer';
import { User } from '../entity/User';
import { createPostgresConnection } from '../utils/createDbConnection';
import TestUtils from '../utils/TestUtilities';

beforeAll(() => {
    return createPostgresConnection();
});

afterAll(async () => {
    await TestUtils.dropUsers();
    await getConnection().close();
});

describe('Mailer', () => {
    let user: User;

    beforeAll(async () => {
        user = await UserService.createUser('Oliver', 'Queen', 'oliver@qc.com', '123456');
    });

    it('exists', () => {
        expect(Mailer).toBeTruthy();
    });

    it('sends default verification email', async () => {
        const email = await Mailer.sendVerificationEmail('http://localhost:4201', user as User);
        expect(email).toHaveProperty('envelope');
        expect(email).toHaveProperty('messageId');
    });

    it('sends password reset email', async () => {
        const email = await Mailer.sendPasswordResetEmail('http://localhost:4201', user as User);
        expect(email).toHaveProperty('envelope');
        expect(email).toHaveProperty('messageId');
    });
});
