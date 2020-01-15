import React from 'react';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import AppProviders from '../AppProviders';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

/*

Palette colors:
1. #022c43
2. #053f5e
3. #115173
4. #ffd700

palette from https://colorhunt.co/palette/141100

*/

// const primary_color = '#022c43';
const secondary_color = '#053f53';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Content = styled.main`
    flex: 1;
    background-color: #eee;

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        padding: 0 0.5rem;
    }
`;

const PageFooterContainer = styled.div`
    min-height: 20vh;
    background: linear-gradient(180deg, #020024 0%, #022c43 70%, #064f77 100%);

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        min-height: 30vh;
        padding: 0 0.5rem;
    }
`;

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Global
                styles={css`
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
                            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
                            'Helvetica Neue', sans-serif;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                        margin: 0;
                        padding: 0;
                    }
                    code {
                        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
                            monospace;
                    }
                    h1,
                    h2 {
                        margin: 0;
                        padding: 0;
                        color: ${secondary_color};
                    }
                `}
            />

            <AppProviders>
                <Container>
                    <Nav />
                    <Content>{children}</Content>
                    <PageFooterContainer>
                        <Footer />
                    </PageFooterContainer>
                </Container>
            </AppProviders>
        </React.Fragment>
    );
};

export default Layout;
