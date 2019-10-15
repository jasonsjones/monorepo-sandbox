import { useEffect, useState } from 'react';
import TextField from '../Common/TextField';

/*
const doUpdate = (query, variables) => {
    return fetch('http://localhost:3000/graphql', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
    }).then(res => res.json());
};
*/

const doResend = query => {
    return fetch('http://localhost:3000/graphql', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
    }).then(res => res.json());
};

const Profile = props => {
    const { contextUser, isEditMode } = props;
    const [editedUser, setEditedUser] = useState({
        firstName: contextUser.name.first,
        lastName: contextUser.name.last,
        email: contextUser.email
    });

    useEffect(() => {
        if (isUpdateRequired()) {
            // send update user mutation to back end then call the below to update
            // the auth user context
            props.onUserUpdate({
                name: { first: editedUser.firstName, last: editedUser.lastName },
                email: editedUser.email
            });
        }
    }, [isEditMode]);

    const isUpdateRequired = () => {
        if (
            editedUser.firstName !== contextUser.name.first ||
            editedUser.lastName !== contextUser.name.last ||
            editedUser.email !== contextUser.email
        ) {
            return true;
        }
        return false;
    };

    const updateField = e => {
        setEditedUser({
            ...editedUser,
            [e.target.id]: e.target.value
        });
    };

    const handleResend = () => {
        console.log('resending email verification message...');
        const query = `query { resendEmailVerification }`;
        doResend(query).then(data => {
            console.log(data);
            console.log('check your email...');
        });
    };

    return (
        <React.Fragment>
            <div className="profile-container">
                <img className="user-avatar" src="/static/placeholder-profile-sq.jpg" />
                <div className="info">
                    {isEditMode ? (
                        <div className="name-form">
                            <div style={{ marginRight: '1.5rem' }}>
                                <TextField
                                    type="text"
                                    name="firstName"
                                    label="First Name"
                                    value={editedUser.firstName}
                                    handleChange={updateField}
                                />
                            </div>
                            <TextField
                                type="text"
                                name="lastName"
                                label="Last Name"
                                value={editedUser.lastName}
                                handleChange={updateField}
                            />
                        </div>
                    ) : (
                        <h2>
                            {editedUser.firstName} {editedUser.lastName}
                        </h2>
                    )}

                    {isEditMode ? (
                        <TextField
                            type="text"
                            name="email"
                            label="Email"
                            value={editedUser.email}
                            handleChange={updateField}
                        />
                    ) : (
                        <p className="email">{editedUser.email}</p>
                    )}
                    {contextUser.isEmailVerified && !isEditMode && (
                        <div className="email-verify-display">
                            <p>Email verified</p>
                            <img src="https:icon.now.sh/done/28/00aa00" alt="done icon" />
                        </div>
                    )}
                    {!contextUser.isEmailVerified && !isEditMode && (
                        <div className="email-verify-display">
                            <p>Email verified</p>
                            <img src="https:icon.now.sh/close/28/aa0000" alt="close icon" />
                            <button type="button" className="resend-link" onClick={handleResend}>
                                Resend
                            </button>
                        </div>
                    )}
                    <p className="id">{contextUser._id}</p>
                </div>
            </div>
            <style jsx>{`
                .profile-container,
                .name-form,
                .email-verify-display {
                    display: flex;
                }
                p {
                    margin: 0;
                }
                button {
                    height: 1.75rem;
                    width: 60px;
                    font-size: 0.75rem;
                    background-color: #fff;
                    border-color: #022c43;
                    color: #022c43;
                    border-radius: 5px;
                }

                button:hover {
                    background-color: #ddd;
                    cursor: pointer;
                }
                .info {
                    margin-left: 2rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                }
                .user-avatar {
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
                .email-verify-display {
                    color: #aaa;
                    align-items: center;
                }
                .email-verify-display img {
                    margin: 0 40px 0 5px;
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

export default Profile;
