import React, { useState } from 'react';
import styled from '@emotion/styled';
import SignupForm from '../../components/SignupForm';
import SignupComplete from '../../components/SignupComplete';

const Container = styled.div`
    max-width: 1280px;
    margin: 20px auto 0;

    & h2 {
        text-align: center;
    }
`;

const SignupFormContainer = styled.div`
    max-width: 460px;
    margin: 1.25rem auto;

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        padding: 0 1.25rem;
    }
`;

const SignupFormCompleteContainer = styled.div`
    margin: 0 2rem;
`;

const Signup = () => {
    const [isSignupComplete, setIsSignupComplete] = useState(false);
    return (
        <Container>
            {!isSignupComplete && (
                <React.Fragment>
                    <h2>Signup for an Account</h2>
                    <SignupFormContainer>
                        <SignupForm onRegister={() => setIsSignupComplete(true)} />
                    </SignupFormContainer>
                </React.Fragment>
            )}

            {isSignupComplete && (
                <SignupFormCompleteContainer>
                    <SignupComplete />
                </SignupFormCompleteContainer>
            )}
        </Container>
    );
};

export default Signup;
