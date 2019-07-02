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
            [e.target.name]: e.target.value
        });
    };
    return (
        <React.Fragment>
            <div className="profile-container">
                <img src="/static/placeholder-profile-sq.jpg" />
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
                    <p className="id">{contextUser._id}</p>
                </div>
            </div>
            <style jsx>{`
                .profile-container,
                .name-form {
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

export default Profile;
