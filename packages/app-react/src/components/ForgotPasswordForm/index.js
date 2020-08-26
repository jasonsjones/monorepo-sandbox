import React, { useState } from 'react';
import TextField from '../Common/Textfield';
import Button from '../Common/Button';
import { executeGqlQuery } from '../../services/dataservice';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [showMsg, setShowMsg] = useState(false);
    const [error, setError] = useState(null);

    const updateField = (e) => {
        setEmail(e.target.value);
        if (showMsg) {
            setShowMsg(false);
        }
        if (error) {
            setError(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = `
            mutation ResetPassword($email: String!) {
                resetPassword(email: $email) {
                    success
                    message
                    payload {
                        user {
                            name
                            passwordResetToken
                            passwordResetTokenExpiresAt
                        }
                    }
                }
            }
        `;
        const variables = {
            email
        };

        if (email.length > 0 && /\w+@\w/.test(email)) {
            executeGqlQuery(query, variables).then(({ errors, data }) => {
                if (data && data.resetPassword && data.resetPassword.success) {
                    setError(null);
                    setShowMsg(true);
                }

                if (errors || !data.resetPassword.success) {
                    setError(
                        'Unable to process your request. Please verify your email and try again.'
                    );
                    setShowMsg(false);
                    setEmail('');
                }
            });
        }
    };

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <TextField
                    type="text"
                    name="email"
                    label="Email"
                    value={email}
                    handleChange={updateField}
                />
                <div className="flex justify-end my-4">
                    <Button type="submit" text="Reset Password" />
                </div>
            </form>
            {error && <p className="text-red-700 mt-4">{error}</p>}
            {showMsg && (
                <p className="bg-purple-100 text-gray-600 p-4 border-2 border-purple-300 rounded-md mb-4">
                    {`An email has just been sent to ${email} which contains a link to reset your password.`}
                </p>
            )}
        </React.Fragment>
    );
};

export default ForgotPasswordForm;
