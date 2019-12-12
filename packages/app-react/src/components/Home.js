/** @jsx jsx */
import React, { useContext } from 'react';
import { css, jsx } from '@emotion/core';
import AuthContext from '../context/AuthContext';

const Home = () => {
    const styles = css`
        text-align: center;
    `;

    const { contextUser } = useContext(AuthContext);

    return (
        <React.Fragment>
            {contextUser && <h1 css={styles}>{`Welcome, ${contextUser.name}`}</h1>}
            {!contextUser && <h1 css={styles}>Welcome to the Monorepo Sandbox</h1>}
        </React.Fragment>
    );
};

export default Home;
