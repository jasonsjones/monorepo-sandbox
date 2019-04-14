import { useState } from 'react';

import Nav from './Nav';
import AuthContext from '../context/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [token, setToken] = useState('');

    const login = (user, token) => {
        setAuthUser(user);
        setToken(token);
        // add to local storage here...
    };

    return (
        <React.Fragment>
            <AuthContext.Provider value={{ authUser, token, login }}>
                <Nav />
                <div className="container">{children}</div>
            </AuthContext.Provider>
        </React.Fragment>
    );
};

export default Layout;
