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
    margin: 20px auto;
`;

const SignupFormCompleteContainer = styled.div`
    margin: 0 2rem;
`;

const Signup = ({ history }) => {
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
                    <SignupComplete history={history} />
                </SignupFormCompleteContainer>
            )}
        </Container>
    );
};

export default Signup;
