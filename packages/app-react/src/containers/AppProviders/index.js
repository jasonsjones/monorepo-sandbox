import React from 'react';
import { AuthProvider } from '../../context/AuthContext';

const AppProviders = ({ children }) => {
    return <AuthProvider>{children}</AuthProvider>;
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
