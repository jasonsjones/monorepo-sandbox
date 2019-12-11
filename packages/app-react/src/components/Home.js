/** @jsx jsx */
import React, { useContext } from 'react';
import { css, jsx } from '@emotion/core';
import AuthContext from '../context/AuthContext';
import { useFetchingCtx } from '../context/fetchingContext';

const Home = () => {
    const styles = css`
        text-align: center;
    `;

    const { contextUser } = useContext(AuthContext);
    const { isFetching } = useFetchingCtx();

    return (
        <React.Fragment>
            {!isFetching && contextUser && <h1 css={styles}>{`Welcome, ${contextUser.name}`}</h1>}
            {!isFetching && !contextUser && <h1 css={styles}>Welcome to the Monorepo Sandbox</h1>}
        </React.Fragment>
    );
};

export default Home;
