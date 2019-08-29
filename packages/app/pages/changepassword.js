import ChangePasswordForm from '../components/ChangePasswordForm';
import { useRouter } from 'next/router';

const ChangePassword = () => {
    const router = useRouter();
    return (
        <React.Fragment>
            <div className="container">
                <h2>Change Password</h2>
                <ChangePasswordForm token={router.query.token} />
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

export default ChangePassword;
