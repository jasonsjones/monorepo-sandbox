import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import UserCard from './UserCard';

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
        .then(payload => payload.data);
};

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [errMsg, setErrMsg] = useState(null);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        const query = `{users { name { first last } _id email } }`;
        fetchUsers(query, authCtx.token)
            .then(data => {
                const { users } = data;
                if (users) {
                    setUsers(users);
                } else {
                    setUsers([]);
                }
                setErrMsg(null);
            })
            .catch(err => setErrMsg(err));
    }, []);

    return (
        <React.Fragment>
            <div className="user-list-container">
                {users.length > 0 && users.map(user => <UserCard key={user._id} user={user} />)}
            </div>
            {errMsg && <p>{errMsg}</p>}
            <style jsx>{`
                .user-list-container {
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap;
                }
            `}</style>
        </React.Fragment>
    );
};

export default UserList;
