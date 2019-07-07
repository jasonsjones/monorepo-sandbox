import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import UserProfile from '../components/User/UserProfile';

const Profile = () => {
    const authCtx = useContext(AuthContext);

    return (
        <React.Fragment>
            <div className="container">
                <div className="header">
                    <h1>Profile</h1>
                    {authCtx.token && <button>Edit</button>}
                </div>

                {authCtx.token && authCtx.authUser ? (
                    <div style={{ marginTop: '20px' }}>
                        <UserProfile user={authCtx.authUser} />
                    </div>
                ) : (
                    <p>Must be logged in to see this resource</p>
                )}
            </div>
            <style jsx>{`
                button {
                    height: 2rem;
                    width: 80px;
                    font-size: 1rem;
                    background-color: #efefef;
                    border-color: #022c43;
                    color: #022c43;
                    border-radius: 5px;
                }

                button:hover {
                    background-color: #ddd;
                    cursor: pointer;
                }
                .container {
                    margin: 20px 50px;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                }

                @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
                    .container {
                        margin: 20px 30px;
                    }
                    h1 {
                        text-align: center;
                    }
                }
            `}</style>
        </React.Fragment>
    );
};
export default Profile;
