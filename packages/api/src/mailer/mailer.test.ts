import User from '../user/userModel';
import Mailer from './mailer';

describe('Mailer', () => {
    it('exists', () => {
        expect(Mailer).toBeTruthy();
    });

    it('sends default verification email', async () => {
        const user = new User({
            name: { first: 'Oliver', last: 'Queen' },
            email: 'oliver@qc.com',
            password: '123456'
        });
        const email = await Mailer.sendVerificatonEmail(user);
        expect(email).toHaveProperty('envelope');
        expect(email).toHaveProperty('messageId');
    });
});
