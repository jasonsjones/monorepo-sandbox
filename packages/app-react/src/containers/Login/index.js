import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    return (
        <div className="container">
            <h2>Login</h2>
            {/* <LoginForm /> */}
            <div className="forgot-password-link">
                <Link to="/resetpassword">Forgot your password?</Link>
            </div>
        </div>
    );
};

export default Login;
