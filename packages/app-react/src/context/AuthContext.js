import React from 'react';

export default React.createContext({
    authUser: null,
    accessToken: '',
    login: () => {},
    logout: () => {},
    updateAuthUser: () => {}
});
