/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useAuthCtx } from '../context/authContext';
import Spinner from './Common/Spinner';

const HomeContainer = styled.div`
    margin-top: 1rem;
`;

const Home = () => {
    const styles = css`
        text-align: center;
    `;

    const { state } = useAuthCtx();
    const { isFetching, contextUser } = state;

    return (
        <HomeContainer>
            {!isFetching && !contextUser && <h1 css={styles}>Welcome to the Monorepo Sandbox</h1>}
            {!isFetching && contextUser && <h1 css={styles}>{`Welcome, ${contextUser.name}`}</h1>}
            {isFetching && <Spinner />}
        </HomeContainer>
    );
};

export default Home;
