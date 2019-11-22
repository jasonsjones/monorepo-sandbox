import React from 'react';
import Button from '../Common/Button';
import './SignupComplete.css';

const SignupComplete = ({ history }) => {
    const handleLoginRoute = () => {
        history.push('/login');
    };

    return (
        <div className="signupcomplete_container">
            <h2>Thank you for creating an account.</h2>
            <h4>
                We have sent an email to the account you provided. Please verify the address and
                then login.
            </h4>
            <div className="center-button">
                <Button clickHandler={handleLoginRoute} type="button" text="Login" />
            </div>
        </div>
    );
};

export default SignupComplete;
