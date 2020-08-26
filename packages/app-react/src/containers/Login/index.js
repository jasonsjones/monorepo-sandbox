import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';

const Login = ({ history }) => {
    return (
        <div className="max-w-4xl mt-6 mx-auto">
            <h2 className="text-2xl font-semibold text-center text-purple-900 sm:text-3xl">
                Login
            </h2>
            <div className="max-w-md mx-auto px-6 sm:px-0">
                <LoginForm history={history} />
                <div className="mt-4 mb-4 pt-6 border-t-2">
                    <Link to="/forgotpassword" className="text-sm text-purple-900">
                        Forgot your password?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
