import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const UserProfile = props => {
    const { user } = props;
    return (
        <React.Fragment>
            <div className="profile-container">
                <img src="/static/placeholder-profile-sq.jpg" />
                <div className="info">
                    <h2>
                        {user.name.first} {user.name.last}
                    </h2>
                    <p className="email">{user.email}</p>
                    <p className="id">{user._id}</p>
                </div>
            </div>
            <style jsx>{`
                .profile-container {
                    display: flex;
                }
                p {
                    margin: 0;
                }
                .info {
                    margin-left: 2rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                }
                img {
                    width: 200px;
                    height: 200px;
                }
                h2 {
                    font-size: 2rem;
                }
                .id {
                    font-size: 0.8rem;
                    color: #ccc;
                }
                .email {
                    color: #aaa;
                    font-size: 1.25rem;
                }
                @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
                    .profile-container {
                        flex-direction: column;
                        align-items: center;
                    }
                    .info {
                        margin: 15px 0;
                    }
                }
            `}</style>
        </React.Fragment>
    );
};

const Profile = () => {
    const authCtx = useContext(AuthContext);

    return (
        <React.Fragment>
            <div className="container">
                <div className="header">
                    <h1>Profile</h1>
                    {authCtx.token && <button>Edit</button>}
                </div>

                {authCtx.token ? (
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
                    h1 {
                        text-align: center;
                    }
                }
            `}</style>
        </React.Fragment>
    );
};
export default Profile;
