import nodemailer from 'nodemailer';
import config from '../config/config';
import { IUser } from '../types';
import { getEmailVerificatonTemplate, getPasswordResetTemplate } from './templates';

interface MailOptions {
    port?: number;
    jsonTransport?: boolean;
}

class Mailer {
    public sendVerificatonEmail = async (user: IUser): Promise<any> => {
        const transporter = nodemailer.createTransport(this.getMailOptions());
        const verifiedTransporter = config.env === 'testing' ? true : await transporter.verify();

        if (verifiedTransporter) {
            return transporter.sendMail({
                from: 'account.verify@sandbox.com',
                to: user.email,
                subject: 'Email Verification',
                text: `
Please verify your email. Thank you!
// this email will include the token -- ${user.emailVerificationToken}
// or maybe a link to some RESTful endpoint:

http://localhost:4200/verifyemail?token=${user.emailVerificationToken}
                `,
                html: getEmailVerificatonTemplate(user)
            });
        }
    };

    public sendPasswordResetEmail = async (user: IUser): Promise<any> => {
        const transporter = nodemailer.createTransport(this.getMailOptions());
        const verifiedTransporter = config.env === 'testing' ? true : await transporter.verify();

        if (verifiedTransporter) {
            return transporter.sendMail({
                from: 'account.reset@sandbox.com',
                to: user.email,
                subject: 'Password Reset',
                text: `
You recently requested to reset your password with Orion Labs.  If you did not initiate this request, no action is required.
If you did, then you will need to click on the below link and change your password.  This link is only valid for the next 2 hours.
// this email will include the token -- ${user.passwordResetToken}
// or maybe a link to some RESTful endpoint:

http://localhost:4200/changepassword?token=${user.passwordResetToken}
                `,
                html: getPasswordResetTemplate(user)
            });
        }
    };

    private getMailOptions = (): MailOptions => {
        let mailOpts = null;
        switch (config.env) {
            case 'testing':
                mailOpts = {
                    jsonTransport: true
                };
                break;

            case 'development':
                // configure for local 'mailhog' smtp server
                mailOpts = {
                    port: 1025
                };
                break;

            default:
                break;
        }
        return mailOpts;
    };
}

export default new Mailer();
