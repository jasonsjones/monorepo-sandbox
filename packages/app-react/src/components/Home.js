/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
const Home = () => (
    <React.Fragment>
        <h1
            css={css`
                text-align: center;
            `}
        >
            Welcome to the Monorepo Sandbox
        </h1>
    </React.Fragment>
);

export default Home;
