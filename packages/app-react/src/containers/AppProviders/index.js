import React from 'react';
import { AuthProvider } from '../../context/authContext';

const AppProviders = ({ children }) => {
    return <AuthProvider>{children}</AuthProvider>;
};

export default AppProviders;
