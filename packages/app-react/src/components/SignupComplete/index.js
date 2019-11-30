import React from 'react';
import styled from '@emotion/styled';
import Button from '../Common/Button';

const Container = styled.div`
    background-color: #fafafa;
    padding: 2rem 0;
    height: 250px;
    border-radius: 10px;
    border: 2px solid lightgray;
    box-shadow: 5px 5px 8px #ccc;

    h2,
    h4 {
        text-align: center;
    }

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        margin: 20px 30px;
        padding: 2rem;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const SignupComplete = ({ history }) => {
    const handleLoginRoute = () => {
        history.push('/login');
    };

    return (
        <Container>
            <h2>Thank you for creating an account.</h2>
            <h4>
                We have sent an email to the account you provided. Please verify the address and
                then login.
            </h4>
            <ButtonContainer>
                <Button clickHandler={handleLoginRoute} type="button" text="Login" />
            </ButtonContainer>
        </Container>
    );
};

export default SignupComplete;
