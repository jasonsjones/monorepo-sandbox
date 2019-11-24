import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import './Login.css';

const css = {
    container: {
        maxWidth: '1280px',
        margin: '20px auto 0'
    },
    loginForm: {
        maxWidth: '460px',
        margin: '20px auto'
    }
};

const Login = ({ history }) => {
    return (
        <div style={css.container}>
            <h2>Login</h2>
            <div style={css.loginForm}>
                <LoginForm history={history} />
                <div className="forgot-password-link">
                    <Link to="/resetpassword">Forgot your password?</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
