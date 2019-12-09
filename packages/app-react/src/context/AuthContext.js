import React from 'react';

export default React.createContext({
    contextUser: null,
    accessToken: '',
    login: () => {},
    logout: () => {},
    updateAuthUser: () => {}
});
