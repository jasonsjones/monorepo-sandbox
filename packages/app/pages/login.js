import LoginForm from '../components/LoginForm/LoginForm';

const Login = () => {
    return (
        <React.Fragment>
            <div style={{ width: '360px', margin: '25px auto 0' }}>
                <h2>Login</h2>
                <LoginForm />
            </div>
        </React.Fragment>
    );
};

export default Login;
