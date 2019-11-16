import nodemailer from 'nodemailer';
import { User } from '../entity/User';
import { getEmailVerificatonTemplateHTML, getEmailVerificatonTemplateText } from './templates';

interface MailOptions {
    port?: number;
    jsonTransport?: boolean;
}

class Mailer {
    public sendVerificatonEmail = async (user: User): Promise<any> => {
        const transporter = nodemailer.createTransport(this.getMailOptions());
        const verifiedTransporter =
            process.env.NODE_ENV === 'testing' ? true : await transporter.verify();

        if (verifiedTransporter) {
            return transporter.sendMail({
                from: 'account.verify@sandbox.com',
                to: user.email,
                subject: 'Email Verification',
                text: getEmailVerificatonTemplateText(user),
                html: getEmailVerificatonTemplateHTML(user)
            });
        }
    };

    private getMailOptions = (): MailOptions => {
        let mailOpts = {};
        switch (process.env.NODE_ENV) {
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
