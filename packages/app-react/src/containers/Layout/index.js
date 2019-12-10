import React, { useState, useEffect } from 'react';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import AuthContext from '../../context/AuthContext';
import { LoadingProvider } from '../../context/LoadingContext';
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

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        padding: 0 0.5rem;
    }
`;

const PageFooter = styled.footer`
    min-height: 20vh;
    background: linear-gradient(180deg, #020024 0%, #022c43 70%, #064f77 100%);

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        min-height: 30vh;
        padding: 0 0.5rem;
    }
`;

const doLogout = query => {
    return fetch('http://localhost:3001/graphql', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
    }).then(res => res.json());
};

const getMe = (query, token) => {
    return fetch('http://localhost:3001/graphql', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ query })
    }).then(res => res.json());
};

const Layout = ({ children }) => {
    const [accessToken, setAccessToken] = useState('');
    const [contextUser, setContextUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/api/refreshtoken', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                if (res.payload.accessToken) {
                    setAccessToken(res.payload.accessToken);
                }
            });
    }, []);

    useEffect(() => {
        const query = `query {
        me {
            name
            email
        }
    }`;
        if (accessToken !== '') {
            getMe(query, accessToken).then(res => {
                if (res.data.me) {
                    setContextUser(res.data.me);
                    setIsLoading(false);
                }
            });
        }
    }, [accessToken]);

    const login = token => {
        setAccessToken(token);
    };

    const logout = () => {
        const query = `
            mutation {
                logout
            }
        `;

        doLogout(query).then(({ data }) => {
            if (data.logout) {
                setAccessToken('');
                setContextUser(null);
            }
        });
    };

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

            <LoadingProvider isLoading={isLoading} setIsLoading={setIsLoading}>
                <AuthContext.Provider value={{ contextUser, accessToken, login, logout }}>
                    <Container>
                        <Nav />
                        <Content>{children}</Content>
                        <PageFooter>
                            <Footer />
                        </PageFooter>
                    </Container>
                </AuthContext.Provider>
            </LoadingProvider>
        </React.Fragment>
    );
};

export default Layout;

// TODO: below ref from nextjs version

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
