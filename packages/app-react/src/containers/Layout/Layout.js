import React, { useState } from 'react';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import AuthContext from '../../context/AuthContext';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

/*

Palette colors:
1. #022c43
2. #053f5e
3. #115173
4. #ffd700

palette from https://colorhunt.co/palette/141100

*/

// const primary_color = '#022c43';
const secondary_color = '#053f53';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Content = styled.main`
    flex: 1;
    background-color: #eee;
    @media (min-device-width: 375px) and (max-device-width: 667px) {
        padding: 0 3rem;
    }
`;

const PageFooter = styled.footer`
    height: 200px;
    background: linear-gradient(180deg, #020024 0%, #022c43 70%, #064f77 100%);
`;

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
        <React.Fragment>
            <Global
                styles={css`
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
                            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
                            'Helvetica Neue', sans-serif;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                        margin: 0;
                        padding: 0;
                    }
                    code {
                        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
                            monospace;
                    }
                    h1,
                    h2 {
                        margin: 0;
                        padding: 0;
                        color: ${secondary_color};
                    }
                `}
            />

            <AuthContext.Provider value={{ accessToken, login }}>
                <Container>
                    <Nav />
                    <Content>{children}</Content>
                    <PageFooter>
                        <Footer />
                    </PageFooter>
                </Container>
            </AuthContext.Provider>
        </React.Fragment>
    );
};

export default Layout;
