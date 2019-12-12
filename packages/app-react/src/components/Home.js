/** @jsx jsx */
import React, { useState } from 'react';
import { css, jsx } from '@emotion/core';
import { useAuthCtx } from '../context/authContext';

const Home = () => {
    const styles = css`
        text-align: center;
    `;

    const { isFetching, contextUser } = useAuthCtx();

    return (
        <React.Fragment>
            {!isFetching && !contextUser && <h1 css={styles}>Welcome to the Monorepo Sandbox</h1>}
            {!isFetching && contextUser && <h1 css={styles}>{`Welcome, ${contextUser.name}`}</h1>}
        </React.Fragment>
    );
};

export default Home;
