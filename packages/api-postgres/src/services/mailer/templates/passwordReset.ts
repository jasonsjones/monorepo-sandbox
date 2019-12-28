import { User } from '../../../entity/User';
import { styles } from './common';

export const getPasswordResetTemplateHTML = (url: string, user: User): string => {
    return `
${styles}
<div class="container">
    <div class="banner"><p>Password Reset</p></div>
    <p class="text">
        You recently requested to reset your password with Orion Labs.  If you did not initiate this request, no action is required.
        If you did, then you will need to click on the below link and change your password.  This link is only valid for the next 2 hours.
    </p>
    <a class="btn" href="${url}/changepassword/${user.passwordResetToken}">Reset Password</a>
    <p class="text">or click on the below link:</p>
    <p class="text"><a href="${url}/changepassword/${user.passwordResetToken}">${url}/changepassword/${user.passwordResetToken}</a></p>
    <p class="text">If you did not request a password reset for your Orion Labs account please disregard this email.</p>
    <p class="text">Thank you!</p>
    <p class="text">&mdash; The Orion Labs Team</p>
</div>
<p style="text-align: center; color: #aaa; font-size: .75rem">Orion Labs, LLC, 1234 Main St., AnyTown WA, 98111</p>
    `;
};

export const getPasswordResetTemplateText = (url: string, user: User): string => {
    return `
This link will start the process to reset your password.
// this email will include the token -- ${user.passwordResetToken}
// or maybe a link to some RESTful endpoint:

${url}/changepassword/${user.passwordResetToken}
    `;
};
