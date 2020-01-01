import React from 'react';
import styled from '@emotion/styled';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';

const Container = styled.div`
    max-width: 1280px;
    margin: 20px auto 0;
    text-align: center;

    & > p {
        color: #696969;
        font-size: 1.25rem;
    }

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        margin: 1.25rem;
    }
`;

const ForgotPasswordContainer = styled.div`
    max-width: 460px;
    margin: 0 auto;
    text-align: left;
`;

const ForgotPassword = () => {
    return (
        <Container>
            <h2>Reset Password</h2>
            <p>
                Enter your email address associated with your account and we'll send you a link to
                reset your password.
            </p>
            <ForgotPasswordContainer>
                <ForgotPasswordForm />
            </ForgotPasswordContainer>
        </Container>
    );
};

export default ForgotPassword;
