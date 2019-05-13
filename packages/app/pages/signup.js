import SignupForm from '../components/SignupForm/SignupForm';

const Signup = () => {
    return (
        <div className="container">
            <h2>Signup for an Account</h2>
            <SignupForm />
            <style jsx>{`
                .container {
                    width: 360px;
                    margin: 20px auto 0;
                }
            `}</style>
        </div>
    );
};

export default Signup;
