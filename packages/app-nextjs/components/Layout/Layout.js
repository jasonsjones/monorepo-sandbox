import { useState } from 'react';
import Router from 'next/router';

import Nav from '../Nav/Nav';
import AuthContext from '../../context/AuthContext';
import './Layout.css';

const doQuery = query => {
    return fetch('http://localhost:3000/graphql', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
    })
        .then(res => res.json())
        .then(payload => payload);
};

const fetchAuthUser = doQuery;
const doLogout = doQuery;

const Layout = ({ children, accessToken }) => {
    const [authUser, setAuthUser] = useState(null);
    const [token, setToken] = useState(accessToken);

    if (token && !authUser) {
        const query = `query {
            me {
                _id
                name {
                    first
                    last
                }
                email
                isEmailVerified
            }
        }`;
        if (process.browser) {
            fetchAuthUser(query).then(({ data }) => setAuthUser(data.me));
        }
    }

    const updateAuthUser = user => {
        setAuthUser({ ...authUser, ...user, ...authUser.name, ...user.name });
    };

    const login = (user, token) => {
        setAuthUser(user);
        setToken(token);
    };

    const logout = () => {
        const logoutQuery = `query { logout }`;
        doLogout(logoutQuery).then(({ data }) => {
            if (data.logout) {
                setAuthUser(null);
                setToken('');
                Router.push('/');
            }
        });
    };

    return (
        <React.Fragment>
            <AuthContext.Provider value={{ authUser, token, login, logout, updateAuthUser }}>
                <Nav />
                <div className="container">{children}</div>
            </AuthContext.Provider>
        </React.Fragment>
    );
};

export default Layout;
