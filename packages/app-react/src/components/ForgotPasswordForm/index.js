import React, { useState } from 'react';
import styled from '@emotion/styled';
import TextField from '../Common/Textfield';
import Button from '../Common/Button';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
`;

const Error = styled.p`
    color: #d63939;
    font-size: 1.25rem;
`;

const Message = styled.div`
    color: #696969;
    font-size: 1.25rem;
`;

const ForgotPasswordForm = () => {
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
        const query = `
            mutation ResetPassword($email: String!) {
                resetPassword(email: $email)
            }
        `;
        const variables = {
            email
        };

        if (email.length > 0 && /\w+@\w/.test(email)) {
            console.log(query);
            console.log(variables);
            setTimeout(() => {
                setError('<Testing Error Logic> Unable to process your request. Try again.');
                setShowMsg(true);
            }, 1500);
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
                <ButtonContainer>
                    <Button type="submit" text="Reset Password" />
                </ButtonContainer>
            </form>
            {error && <Error>{error}</Error>}
            {showMsg && (
                <Message>
                    <p>{`An email has just been sent to ${email} which contains a link to reset your password.`}</p>
                </Message>
            )}
        </React.Fragment>
    );
};

export default ForgotPasswordForm;
