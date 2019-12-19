import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
    margin: 1.25rem 4rem;
    background-color: #fafafa;
    min-height: 250px;
    padding: 1.25rem 3rem;
    border-radius: 10px;
    border: 2px solid lightgray;
    box-shadow: 5px 5px 8px #ccc;

    & h2 {
        text-align: center;
        margin-bottom: 2rem;
    }

    & p {
        color: #aaa;
        word-break: break-word;
    }

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        margin: 1.25rem 2rem;
    }
`;

const ConfirmEmail = ({ match }) => {
    return (
        <Container>
            <h2>Confirm Email</h2>
            <p>{`token: ${match.params.token}`}</p>
            <p>
                This component will pull the token from the url parameter and make a call to{' '}
                <code>http://localhost:3001/api/confirm-email?token=[token]</code>
            </p>
        </Container>
    );
};

export default ConfirmEmail;
