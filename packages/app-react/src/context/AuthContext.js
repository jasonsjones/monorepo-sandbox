import React, { useContext, useEffect, useState } from 'react';

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

const AuthContext = React.createContext({
    contextUser: null,
    accessToken: '',
    login: () => {},
    logout: () => {},
    updateAuthUser: () => {}
});

const AuthProvider = props => {
    const [accessToken, setAccessToken] = useState('');
    const [contextUser, setContextUser] = useState(null);

    useEffect(() => {
        // setIsFetching(true);
        fetch('http://localhost:3001/api/refreshtoken', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                // setIsFetching(false);
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
            // setIsFetching(true);
            getMe(query, accessToken).then(res => {
                if (res.data.me) {
                    setContextUser(res.data.me);
                    // setIsFetching(false);
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

    return <AuthContext.Provider value={{ contextUser, accessToken, login, logout }} {...props} />;
};

const useAuthCtx = () => useContext(AuthContext);

export { AuthProvider, useAuthCtx };

export default AuthContext;
