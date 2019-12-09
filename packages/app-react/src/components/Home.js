/** @jsx jsx */
import React, { useContext } from 'react';
import { css, jsx } from '@emotion/core';
import AuthContext from '../context/AuthContext';
import LoadingContext from '../context/LoadingContext';

const Home = () => {
    const styles = css`
        text-align: center;
    `;

    const authCtx = useContext(AuthContext);
    const loadingCtx = useContext(LoadingContext);

    return (
        <React.Fragment>
            {!loadingCtx.isLoading && authCtx.contextUser && (
                <h1 css={styles}>{`Welcome, ${authCtx.contextUser.name}`}</h1>
            )}
            {!loadingCtx.isLoading && !authCtx.contextUser && (
                <h1 css={styles}>Welcome to the Monorepo Sandbox</h1>
            )}
        </React.Fragment>
    );
};

export default Home;
