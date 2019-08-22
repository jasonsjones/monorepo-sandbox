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
                text: `
Please verify your email. Thank you!
// this email will include the token -- ${user.emailVerificationToken}
// or maybe a link to some RESTful endpoint:

http://localhost:4200/verifyemail?token=${user.emailVerificationToken}

                `,
                html: `
<style>
    body {
        background-color: #eee;
        font-family: sans-serif;
    }
    .container {
        max-width: 560px;
        margin: 0 auto;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 300;
    }
    .banner {
        height: 60px;
        background-color: #00aa00;
        background: rgb(2, 0, 36);
        background: linear-gradient(90deg, #020024 0%, #022c43 40%, #064f77 100%);
    }
    .banner p {
        color: #fff;
        text-align: center;
        font-size: 1.4rem;
        margin: 0;
        padding-top: 15px;
    }
    .text {
        padding: 0 30px
    }
</style>
<div class="container" style="">
    <div class="banner"><p>Thank you for registering</p></div>
    <p class="text">Thanks for using Orion Labs! Please confirm your email address by clicking on the link below. We'll communicate with you from time to time via email so it's important that we have an up-to-date email address on file.</p>
    <p class= "text"><a href="http://localhost:4200/verifyemail?token=${user.emailVerificationToken}">http://localhost:4200/verifyemail?token=${user.emailVerificationToken}</a></p>
    <p class="text">If you did not sign up for a Orion Labs account please disregard this email.</p>
    <p class="text">Thank you!</p>
    <p class="text">&mdash; The Orion Labs Team</p>

</div>

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
