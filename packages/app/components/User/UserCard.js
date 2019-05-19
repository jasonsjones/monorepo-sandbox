const UserCard = props => {
    const { user } = props;
    return (
        <React.Fragment>
            <section className="user-container">
                <div className="user-info name">
                    {user.name.first} {user.name.last}
                </div>
                <div className="user-info">{user.email}</div>
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
