import nodemailer from 'nodemailer';
import config from '../config/config';

class Mailer {
    public sendVerificatonEmail = async (user: any): Promise<any> => {
        const transporter = nodemailer.createTransport(this.getMailOptions());
        const verifiedTransporter = config.env === 'testing' ? true : await transporter.verify();

        if (verifiedTransporter) {
            return transporter.sendMail({
                from: 'me@example.com',
                to: user.email,
                subject: 'Email Verification',
                text: `Please verify your email (token ${user.emailVerificationToken})...Thanks!`
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
