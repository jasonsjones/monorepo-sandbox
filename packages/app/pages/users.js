import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [errMsg, setErrMsg] = useState(null);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        if (!authCtx.token) {
            setErrMsg('Must be authenticated to view this resource');
        } else {
            const query = `{users { _id email } }`;
            fetch('http://localhost:3000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authCtx.token}`
                },
                body: JSON.stringify({ query })
            })
                .then(res => res.json())

                .then(res => {
                    const { users } = res.data;
                    if (users) {
                        setUsers(users);
                    } else {
                        setUsers([]);
                    }
                    setErrMsg(null);
                })
                .catch(err => console.log(err));
        }
    }, []);

    return (
        <React.Fragment>
            <h1>Users</h1>
            {users.length > 0 && users.map(user => <p key={user._id}>{user.email}</p>)}
            {errMsg && <p>{errMsg}</p>}
        </React.Fragment>
    );
};

export default Users;
