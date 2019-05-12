import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';

const fetchUsers = (query, token) => {
    return fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ query })
    })
        .then(res => res.json())
        .then(payload => payload.data)
        .catch(err => console.log(err));
};

const UserCard = props => {
    const { user } = props;
    return (
        <React.Fragment>
            <section className="user-container">
                <div className="user-info">
                    {user.name.first} {user.name.last}
                </div>
                <div className="user-info">{user.email}</div>
                <div className="user-info">{user._id}</div>
            </section>
            <style jsx>{`
                .user-container {
                    display: flex;
                }
                .user-info {
                    flex-basis: 250px;
                }
            `}</style>
        </React.Fragment>
    );
};

const Users = () => {
    const [users, setUsers] = useState([]);
    const [errMsg, setErrMsg] = useState(null);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        if (!authCtx.token) {
            setErrMsg('Must be authenticated to view this resource');
        } else {
            const query = `{users { name { first last } _id email } }`;
            fetchUsers(query, authCtx.token).then(data => {
                const { users } = data;
                if (users) {
                    setUsers(users);
                } else {
                    setUsers([]);
                }
                setErrMsg(null);
            });
        }
    }, []);

    return (
        <React.Fragment>
            <h1>Users</h1>
            {users.length > 0 && users.map(user => <UserCard key={user._id} user={user} />)}
            {errMsg && <p>{errMsg}</p>}
        </React.Fragment>
    );
};

export default Users;
