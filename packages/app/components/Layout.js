import { useState } from 'react';
import Nav from './Nav';
import AuthContext from '../context/AuthContext';

const Layout = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [token, setToken] = useState('');
    return (
        <AuthContext.Provider value={{ authUser, token }}>
            <Nav />
            {children}
        </AuthContext.Provider>
    );
};

export default Layout;
