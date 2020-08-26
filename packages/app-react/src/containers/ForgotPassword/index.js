import React from 'react';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';

const ForgotPassword = () => {
    return (
        <div className="max-w-4xl mt-6 mx-auto px-4">
            <h2 className="text-2xl font-semibold text-center text-purple-900 mb-4 sm:text-3xl">
                Reset Password
            </h2>
            <p className="text-base text-gray-600 text-center">
                Enter your email address associated with your account and we'll send you a link to
                reset your password.
            </p>
            <div className="max-w-md mx-auto px-6 sm:px-0">
                <ForgotPasswordForm />
            </div>
        </div>
    );
};

export default ForgotPassword;
