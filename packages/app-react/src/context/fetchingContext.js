import React, { useContext } from 'react';

const FetchingContext = React.createContext({
    isFetching: false,
    setIsFetching: () => {}
});

const FetchingProvider = props => {
    return (
        <FetchingContext.Provider
            value={{ isFetching: props.isFetching, setIsFetching: props.setIsFetching }}
            {...props}
        />
    );
};

const useFetchingCtx = () => useContext(FetchingContext);
export { FetchingProvider, useFetchingCtx };
