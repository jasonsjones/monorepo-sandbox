import React, { useState } from 'react';
import TextField from '../Common/TextField';
import Button from '../Common/Button';

const ResetPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [showMsg, setShowMsg] = useState(false);
    const [error, setError] = useState(null);

    const updateField = e => {
        setEmail(e.target.value);
        if (showMsg) {
            setShowMsg(false);
        }
        if (error) {
            setError(null);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (email.length > 0 && /\w+@\w/.test(email)) {
            // make gql query to reset password and then setShowMsg on success.
            // const query = `query { resetPassword(email: email)}`
            setShowMsg(true);
        } else {
            setError('Not a valid email address');
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
                <Button type="submit" text="Reset" />
            </form>
            {error && <p style={{ color: '#d63939' }}>{error}</p>}

            {showMsg && (
                <>
                    <p>A request to reset your password had been sent.</p>
                    <p>{`We just sent you an email to ${email} which contains a link to reset your password.`}</p>
                </>
            )}
        </React.Fragment>
    );
};

export default ResetPasswordForm;
