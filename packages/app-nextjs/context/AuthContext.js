import React from 'react';

export default React.createContext({
    authUser: null,
    token: '',
    login: () => {},
    logout: () => {},
    updateAuthUser: () => {}
});
