import React, { useState } from 'react';
import AuthContext from '../../context/AuthContext';
import Nav from '../../components/Nav';
// import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import './Layout.css';

/*
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
*/

const Layout = ({ children }) => {
    const [accessToken, setAccessToken] = useState('');
    const login = token => {
        setAccessToken(token);
    };
    /*
    const [authUser, setAuthUser] = useState(null);

    if (token && !authUser) {
        const query = `query {
            me {
                name {
                    first
                    last
                }
                email
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
    */

    return (
        <AuthContext.Provider value={{ accessToken, login }}>
            <div className="site-container">
                <header className="site-header">
                    <Nav />
                </header>
                <main className="site-content">
                    {/* <Banner /> */}
                    {children}
                </main>
                <footer className="site-footer">
                    <Footer />
                </footer>
            </div>
        </AuthContext.Provider>
    );
};

export default Layout;
