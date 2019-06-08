import TextField from '../Common/TextField';
const Profile = props => {
    const { user, editMode } = props;
    return (
        <React.Fragment>
            <div className="profile-container">
                <img src="/static/placeholder-profile-sq.jpg" />
                <div className="info">
                    {editMode ? (
                        <div className="name-form">
                            <div style={{ marginRight: '1.5rem' }}>
                                <TextField
                                    type="text"
                                    name="firstName"
                                    label="First Name"
                                    value={user.name.first}
                                    handleChange={() => {}}
                                />
                            </div>
                            <TextField
                                type="text"
                                name="lastName"
                                label="Last Name"
                                value={user.name.last}
                                handleChange={() => {}}
                            />
                        </div>
                    ) : (
                        <h2>
                            {user.name.first} {user.name.last}
                        </h2>
                    )}
                    {editMode ? (
                        <TextField
                            type="text"
                            name="email"
                            label="Email"
                            value={user.email}
                            handleChange={() => {}}
                        />
                    ) : (
                        <p className="email">{user.email}</p>
                    )}
                    <p className="id">{user._id}</p>
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
