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
                <div className="container">{children}</div>
            </AuthContext.Provider>

            <style jsx global>{`
                body {
                    font-family: 'Arial';
                    margin: 0;
                    padding: 0;
                }

                h1,
                h2 {
                    margin: 0;
                    padding: 0;
                    color: #1f3c88;
                }

                .container {
                    width: 960px;
                    margin: 0 auto;
                }
            `}</style>
        </React.Fragment>
    );
};

export default Layout;
