import nodemailer from 'nodemailer';
import config from '../config/config';
import { IUser } from '../types';

class Mailer {
    public sendVerificatonEmail = async (user: IUser): Promise<any> => {
        const transporter = nodemailer.createTransport(this.getMailOptions());
        const verifiedTransporter = config.env === 'testing' ? true : await transporter.verify();

        if (verifiedTransporter) {
            return transporter.sendMail({
                from: 'account.verify@sandbox.com',
                to: user.email,
                subject: 'Email Verification',
                text: `Please verify your email. Thank you!
                // this email will include the token -- ${user.emailVerificationToken}
                // or maybe a link to some RESTful endpoint:

                    http://localhost:3000/api/verifyemail/${user.emailVerificationToken}
                `
            });
        }
    };

    private getMailOptions = () => {
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
