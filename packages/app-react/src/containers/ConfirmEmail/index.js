import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { executeGqlQuery } from '../../services/dataservice';

const Container = styled.div`
    margin: 1.25rem auto;
    max-width: 760px;
    background-color: #fafafa;
    min-height: 150px;
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

    & a {
        text-decoration: none;
        color: #022c43;
    }

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        margin: 1.25rem;
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
            } else {
                setMessage(
                    'Sorry...  Something went wrong confirming your email.  Please try again.'
                );
                setEmailConfirmed(false);
            }

            if (errors) {
                console.log(errors);
            }
        });
    }, [match.params.token]);

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
                    <p>
                        Feel free to <Link to="/login">login</Link> to access your account.
                    </p>
                </React.Fragment>
            ) : (
                ''
            )}
        </Container>
    );
};

export default ConfirmEmail;
