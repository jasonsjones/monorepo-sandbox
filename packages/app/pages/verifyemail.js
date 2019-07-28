import Router from 'next/router';
import Button from '../components/Common/Button';

const VerifyEmail = () => {
    const handleLoginRoute = () => {
        Router.push('/login');
    };

    return (
        <React.Fragment>
            <div className="container">
                <h2>Thank you for creating an account.</h2>
                <h4>
                    We have sent an email to the account you provided. Please verify the address and
                    then login.
                </h4>
                <div className="center-button">
                    <Button clickHandler={handleLoginRoute} type="button" text="Login" />
                </div>
            </div>
            <style jsx>{`
                .container {
                    margin: 20px 50px;
                    background-color: #fafafa;
                    padding: 20px;
                    height: 250px;
                    border-radius: 10px;
                    border: 2px solid lightgray;
                    box-shadow: 5px 5px 8px #ccc;
                }

                h2,
                h4 {
                    text-align: center;
                }

                .center-button {
                    display: flex;
                    justify-content: center;
                }

                @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
                    .container {
                        margin: 20px 30px;
                    }
                }
            `}</style>
        </React.Fragment>
    );
};

export default VerifyEmail;
