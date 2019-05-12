import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import UserList from '../components/User/UserList';

const Users = () => {
    const authCtx = useContext(AuthContext);

    return (
        <React.Fragment>
            <h1>Users</h1>
            {authCtx.token ? <UserList /> : <p>Must be logged in to see this resource</p>}
        </React.Fragment>
    );
};

export default Users;
