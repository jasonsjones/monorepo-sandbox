import { useEffect, useState } from 'react';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const query = `{users { _id email } }`;
        fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        })
            .then(res => res.json())
            .then(res => setUsers(res.data.users))
            .catch(err => console.log(err));
    }, []);

    return (
        <React.Fragment>
            <h1>Users</h1>
            {users.length > 0 && users.map(user => <p key={user._id}>{user.email}</p>)}
        </React.Fragment>
    );
};

export default Users;
