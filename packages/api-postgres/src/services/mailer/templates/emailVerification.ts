import { User } from '../../../entity/User';
import { styles } from './common';

export const getEmailVerificatonTemplateHTML = (url: string, user: User): string => {
    return `
${styles}
<div class="container">
    <div class="banner"><p>Thank you for registering</p></div>
    <p class="text">Thanks for using Orion Labs! Please confirm your email address by clicking on the link below. We'll communicate with you from time to time via email so it's important that we have an up-to-date email address on file.</p>
    <a class="btn" href="${url}/confirm-email/${user.emailVerificationToken}">Verify Email</a>
    <p class="text">or click on the below link:</p>
    <p class="text"><a href="${url}/confirm-email/${user.emailVerificationToken}">${url}/confirm-email/${user.emailVerificationToken}</a></p>
    <p class="text">If you did not sign up for a Orion Labs account please disregard this email.</p>
    <p class="text">Thank you!</p>
    <p class="text">&mdash; The Orion Labs Team</p>
</div>
<p style="text-align: center; color: #aaa; font-size: .75rem">Orion Labs, LLC, 1234 Main St., AnyTown WA, 98111</p>
    `;
};

export const getEmailVerificatonTemplateText = (url: string, user: User): string => {
    return `
Please verify your email. Thank you!
// this email will include the token -- ${user.emailVerificationToken}
// or maybe a link to some RESTful endpoint:

${url}/confirm-email/${user.emailVerificationToken}
    `;
};
