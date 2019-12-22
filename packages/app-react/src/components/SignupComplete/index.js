import React from 'react';
import styled from '@emotion/styled';

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

const SignupComplete = () => {
    return (
        <Container>
            <h2>Thank you for creating an account.</h2>
            <h4>
                We have sent an email to the account you provided. Please verify the address and
                then login.
            </h4>
        </Container>
    );
};

export default SignupComplete;
