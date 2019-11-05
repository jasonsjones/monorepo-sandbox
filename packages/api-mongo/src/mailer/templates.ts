import { IUser } from '../types';

const styles = `
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
    .btn {
        display: block;
        height: 40px;
        width: 150px;
        font-size: 1rem;
        background-color: #022c43;
        color: #fff;
        border-radius: 5px;
        margin: 0 auto;
        padding-top: 20px;
        text-align: center;
        text-decoration: none;
    }
</style>
`;

export const getEmailVerificatonTemplate = (user: IUser): string => {
    return `
${styles}
<div class="container">
    <div class="banner"><p>Thank you for registering</p></div>
    <p class="text">Thanks for using Orion Labs! Please confirm your email address by clicking on the link below. We'll communicate with you from time to time via email so it's important that we have an up-to-date email address on file.</p>
    <a class="btn" href="http://localhost:4200/verifyemail?token=${user.emailVerificationToken}">Verify Email</a>
    <p class="text">or click on the below link:</p>
    <p class="text"><a href="http://localhost:4200/verifyemail?token=${user.emailVerificationToken}">http://localhost:4200/verifyemail?token=${user.emailVerificationToken}</a></p>
    <p class="text">If you did not sign up for a Orion Labs account please disregard this email.</p>
    <p class="text">Thank you!</p>
    <p class="text">&mdash; The Orion Labs Team</p>
</div>
<p style="text-align: center; color: #aaa; font-size: .75rem">Orion Labs, LLC, 1234 Main St., AnyTown WA, 98111</p>
    `;
};

export const getPasswordResetTemplate = (user: IUser): string => {
    return `
${styles}
<div class="container">
    <div class="banner"><p>Password Reset</p></div>
    <p class="text">
        You recently requested to reset your password with Orion Labs.  If you did not initiate this request, no action is required.
        If you did, then you will need to click on the below link and change your password.  This link is only valid for the next 2 hours.
    </p>
    <a class="btn" href="http://localhost:4200/changepassword?token=${user.passwordResetToken}">Reset Password</a>
    <p class="text">or click on the below link:</p>
    <p class="text"><a href="http://localhost:4200/changepassword?token=${user.passwordResetToken}">http://localhost:4200/changepassword?token=${user.passwordResetToken}</a></p>
    <p class="text">If you did not request a password reset for your Orion Labs account please disregard this email.</p>
    <p class="text">Thank you!</p>
    <p class="text">&mdash; The Orion Labs Team</p>
</div>
<p style="text-align: center; color: #aaa; font-size: .75rem">Orion Labs, LLC, 1234 Main St., AnyTown WA, 98111</p>
    `;
};
