import LoginForm from '../components/LoginForm/LoginForm';

const Login = () => {
    return (
        <React.Fragment>
            <div className="container">
                <h2>Login</h2>
                <LoginForm />
                <style jsx>{`
                    .container {
                        width: 360px;
                        margin: 20px auto 0;
                    }
                `}</style>
            </div>
        </React.Fragment>
    );
};

export default Login;
