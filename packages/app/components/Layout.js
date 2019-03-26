import { useState } from 'react';
import Nav from './Nav';
import AuthContext from '../context/AuthContext';

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
                {children}
            </AuthContext.Provider>
            <style jsx global>{`
                body {
                    font-family: 'Arial';
                    margin: 0;
                    padding: 0;
                }
            `}</style>
        </React.Fragment>
    );
};

export default Layout;
