const UserCard = props => {
    const { user } = props;
    return (
        <React.Fragment>
            <section className="user-container">
                <div className="user-info name">
                    {user.name.first} {user.name.last}
                </div>
                <div className="user-info">{user.email}</div>

                {user.isEmailVerified && (
                    <div className="email-verify-display">
                        <p>Email verified</p>
                        <img src="https:icon.now.sh/done/28/00aa00" alt="done icon" />
                    </div>
                )}
                {!user.isEmailVerified && (
                    <div className="email-verify-display">
                        <p>Email verified</p>
                        <img src="https:icon.now.sh/close/28/aa0000" alt="close icon" />
                    </div>
                )}
                <div className="user-info id">{user._id}</div>
            </section>
            <style jsx>{`
                .user-container {
                    display: flex;
                    flex-direction: column;
                    width: 200px;
                    align-items: center;
                    border: 1px solid #ccc;
                    margin: 10px 10px 0 0;
                    border-radius: 10px;
                    transition: all 200ms ease-in-out;
                }

                .user-container:hover {
                    background-color: #ffd700;
                    box-shadow: 5px 5px 8px #ccc;
                }

                .user-info {
                    padding: 10px;
                }

                .email-verify-display {
                    display: flex;
                    padding: 0 10px;
                }

                .email-verify-display img {
                    margin: 0 0 0 5px;
                }

                .name {
                    font-size: 1.25rem;
                }

                .id {
                    font-size: 0.75rem;
                    color: #aaa;
                }
                @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
                    .user-container {
                        width: 300px;
                    }
                }
            `}</style>
        </React.Fragment>
    );
};

export default UserCard;
