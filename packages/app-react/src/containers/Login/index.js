import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import LoginForm from '../../components/LoginForm';

const Container = styled.div`
    max-width: 1280px;
    margin: 20px auto 0;

    & h2 {
        text-align: center;
    }
`;

const LoginFormContainer = styled.div`
    max-width: 460px;
    margin: 1.25rem auto;

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        padding: 0 1.25rem;
    }
`;

const ForgotPasswordContainer = styled.div`
    margin: 1.25rem 0 1rem;
    border-top: 1px #ddd solid;
    padding-top: 1.25rem;

    & a {
        text-decoration: none;
        color: #022c43;
        font-size: 0.9rem;
    }

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        margin: 2rem 0 1rem;
    }
`;

const Login = ({ history }) => {
    return (
        <Container>
            <h2>Login</h2>
            <LoginFormContainer>
                <LoginForm history={history} />
                <ForgotPasswordContainer>
                    <Link to="/resetpassword">Forgot your password?</Link>
                </ForgotPasswordContainer>
            </LoginFormContainer>
        </Container>
    );
};

export default Login;
