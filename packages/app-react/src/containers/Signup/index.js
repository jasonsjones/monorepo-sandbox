import React, { useState } from 'react';
import SignupForm from '../../components/SignupForm';
import SignupComplete from '../../components/SignupComplete';

const css = {
    container: {
        maxWidth: '1280px',
        margin: '20px auto 0'
    },
    signupForm: {
        width: '460px',
        margin: '20px auto'
    },
    signupComplete: {
        margin: '0 2rem'
    }
};

const Signup = ({ history }) => {
    const [isSignupComplete, setIsSignupComplete] = useState(false);
    return (
        <div style={css.container}>
            {!isSignupComplete && (
                <React.Fragment>
                    <h2>Signup for an Account</h2>
                    <div style={css.signupForm}>
                        <SignupForm onRegister={() => setIsSignupComplete(true)} />
                    </div>
                </React.Fragment>
            )}

            {isSignupComplete && (
                <div style={css.signupComplete}>
                    <SignupComplete history={history} />
                </div>
            )}
        </div>
    );
};

export default Signup;
