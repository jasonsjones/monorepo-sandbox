import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { executeGqlQuery } from '../../services/dataservice';
import Button from '../../components/Common/Button';

const Container = styled.div`
    margin: 1.25rem auto;
    max-width: 760px;
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
        margin: 1.25rem;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        justify-content: center;
    }
`;

const ConfirmEmail = ({ match, history }) => {
    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const [message, setMessage] = useState('Confirming email...');
    useEffect(() => {
        const query = `
            mutation ConfirmEmail($token: String!) {
                confirmEmail(token: $token) {
                    success
                    message
                    payload {
                    user {
                        id
                        name
                        isEmailVerified
                        emailVerificationToken
                    }
                    }
                }
            }
        `;
        const variables = { token: match.params.token };

        executeGqlQuery(query, variables).then(({ errors, data }) => {
            if (data && data.confirmEmail && data.confirmEmail.success) {
                setTimeout(() => {
                    setMessage('Thanks for confirming your email');
                    setEmailConfirmed(true);
                }, 2000);
            } else if (errors) {
                console.log(errors);
            }
        });
    }, [match.params.token]);

    const handleLoginRoute = () => {
        history.push('/login');
    };

    return (
        <Container>
            <h2>{message}</h2>
            {emailConfirmed ? (
                <React.Fragment>
                    <p>
                        We appreciate you taking the time to confirm your email. It will greatly
                        assist us in the future should we need to send you any important
                        information.
                    </p>
                    <p>Feel free to click on the button below to login to you account.</p>
                    <ButtonContainer>
                        <Button clickHandler={handleLoginRoute} type="button" text="Login" />
                    </ButtonContainer>
                </React.Fragment>
            ) : (
                ''
            )}
        </Container>
    );
};

export default ConfirmEmail;
