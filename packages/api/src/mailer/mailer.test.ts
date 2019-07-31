import Mailer from './mailer';

describe('Mailer', () => {
    it('exists', () => {
        expect(Mailer).toBeTruthy();
    });

    it('sends default verification email', async () => {
        const email = await Mailer.sendVerificatonEmail({
            email: 'oliver@qc.com',
            emailVerificationToken: 'somerandomtokenhere'
        });
        expect(email).toHaveProperty('envelope');
        expect(email).toHaveProperty('messageId');
    });
});
