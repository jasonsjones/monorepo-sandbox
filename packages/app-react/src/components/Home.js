/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useAuthState } from '../context/authContext';
import Spinner from './Common/Spinner';

const HomeContainer = styled.div`
    margin-top: 1rem;
`;

const SpinnerContainer = styled.div`
    margin-top: 4rem;
`;

const Home = () => {
    const styles = css`
        text-align: center;
    `;

    const authState = useAuthState();
    const { isFetching, contextUser } = authState;

    return (
        <HomeContainer>
            {!isFetching && !contextUser && <h1 css={styles}>Welcome to the Monorepo Sandbox</h1>}
            {!isFetching && contextUser && <h1 css={styles}>{`Welcome, ${contextUser.name}`}</h1>}
            {isFetching && (
                <SpinnerContainer>
                    <Spinner />
                </SpinnerContainer>
            )}
        </HomeContainer>
    );
};

export default Home;
