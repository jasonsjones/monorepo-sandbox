import React, { useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { FetchingProvider } from '../../context/fetchingContext';

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

const AppProviders = ({ children }) => {
    const [accessToken, setAccessToken] = useState('');
    const [contextUser, setContextUser] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        setIsFetching(true);
        fetch('http://localhost:3001/api/refreshtoken', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                setIsFetching(false);
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
            setIsFetching(true);
            getMe(query, accessToken).then(res => {
                if (res.data.me) {
                    setContextUser(res.data.me);
                    setIsFetching(false);
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
        <FetchingProvider isFetching={isFetching} setIsFetching={setIsFetching}>
            <AuthContext.Provider value={{ contextUser, accessToken, login, logout }}>
                {children}
            </AuthContext.Provider>
        </FetchingProvider>
    );
};

export default AppProviders;

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
