import React, { useContext } from 'react';

const LoadingContext = React.createContext({
    isLoading: false,
    setIsLoading: () => {}
});

const LoadingProvider = props => {
    return (
        <LoadingContext.Provider
            value={{ isLoading: props.isLoading, setIsLoading: props.setIsLoading }}
            {...props}
        />
    );
};

const useLoadingCtx = () => useContext(LoadingContext);
export { LoadingProvider, useLoadingCtx };
