import ResetPasswordForm from '../components/ResetPassword';

const ResetPassword = () => {
    return (
        <React.Fragment>
            <div className="container">
                <h2>Reset Password</h2>
                <ResetPasswordForm />
            </div>
            <style jsx>{`
                .container {
                    width: 360px;
                    margin: 20px auto 0;
                }
            `}</style>
        </React.Fragment>
    );
};

export default ResetPassword;
