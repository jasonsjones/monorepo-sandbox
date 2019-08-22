import Link from 'next/link';
import LoginForm from '../components/LoginForm/LoginForm';

const Login = () => {
    return (
        <React.Fragment>
            <div className="container">
                <h2>Login</h2>
                <LoginForm />
                <div className="forgot-password-link">
                    <Link href="/resetpassword">
                        <a>Forgot your password?</a>
                    </Link>
                </div>
                <style jsx>{`
                    .container {
                        width: 360px;
                        margin: 20px auto 0;
                    }

                    .forgot-password-link {
                        margin-top: 20px;
                        border-top: 1px #ddd solid;
                        padding-top: 20px;
                    }

                    a {
                        text-decoration: none;
                        color: #022c43;
                        font-size: 0.9rem;
                    }
                `}</style>
            </div>
        </React.Fragment>
    );
};

export default Login;
