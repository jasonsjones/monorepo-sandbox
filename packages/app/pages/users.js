import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import UserList from '../components/User/UserList';

const Users = () => {
    const authCtx = useContext(AuthContext);

    return (
        <React.Fragment>
            <div className="container">
                <h1>Users</h1>
                {authCtx.token ? <UserList /> : <p>Must be logged in to see this resource</p>}
            </div>
            <style jsx>{`
                .container {
                    margin: 20px;
                }

                @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
                    h1 {
                        text-align: center;
                    }
                }
            `}</style>
        </React.Fragment>
    );
};

export default Users;
