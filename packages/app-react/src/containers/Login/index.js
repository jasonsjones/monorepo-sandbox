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
    margin: 20px auto;
`;

const ForgotPasswordContainer = styled.div`
    margin-top: 20px;
    border-top: 1px #ddd solid;
    padding-top: 20px;

    & a {
        text-decoration: none;
        color: #022c43;
        font-size: 0.9rem;
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
