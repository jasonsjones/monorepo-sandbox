import React, { useContext } from 'react';

const FetchingContext = React.createContext({
    isLoading: false,
    setIsLoading: () => {}
});

const FetchingProvider = props => {
    return (
        <FetchingContext.Provider
            value={{ isLoading: props.isLoading, setIsLoading: props.setIsLoading }}
            {...props}
        />
    );
};

const useLoadingCtx = () => useContext(FetchingContext);
export { FetchingProvider, useLoadingCtx };
