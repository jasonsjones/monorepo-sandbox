import React, { useState } from 'react';
import styled from '@emotion/styled';

const SOCIAL_ICON_COLOR = 'ccc';
const SOCIAL_ICON_COLOR_HOVER = 'fff';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const FooterContent = styled.div`
    display: flex;
    justify-content: center;
    color: #ccc;

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        flex-direction: column;
        margin: 0 2rem;
    }
`;

const About = styled.section`
    max-width: 450px;
    margin-right: 4rem;

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        margin: 0;

        & h3 {
            text-align: center;
        }
    }
`;

const Connect = styled.section`
    margin-bottom: 1.5rem;

    & a:hover {
        color: #fff;
    }

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        & h3 {
            text-align: center;
        }
    }
`;

const SocialAccount = styled.a`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    text-decoration: none;
    color: #ccc;

    &:hover {
        color: #fff;
    }
`;

const SocialAccountContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
`;

const Icon = styled.img`
    margin-right: 0.75rem;
`;

const Copyright = styled.section`
    text-align: center;
    margin-bottom: 1rem;
    color: #999;
    font-size: 0.75rem;
`;

const Footer = () => {
    const [githubIconColor, setGithubIconColor] = useState(SOCIAL_ICON_COLOR);
    const [twitterIconColor, setTwitterIconColor] = useState(SOCIAL_ICON_COLOR);

    return (
        <Container>
            <FooterContent>
                <About>
                    <h3>About</h3>
                    <p>
                        A simple playground app to explore the technical benefits and project
                        structure of a monorepo; and play around a bit with a few different core
                        tech stacks.
                    </p>
                </About>
                <Connect>
                    <h3>Connect</h3>
                    <SocialAccountContainer>
                        <SocialAccount
                            onMouseOver={() => setGithubIconColor(SOCIAL_ICON_COLOR_HOVER)}
                            onMouseOut={() => setGithubIconColor(SOCIAL_ICON_COLOR)}
                            href="https://github.com/jasonsjones"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Icon
                                src={`https:icon.now.sh/github/22/${githubIconColor}`}
                                alt="github account"
                            />
                            github
                        </SocialAccount>
                        <SocialAccount
                            onMouseOver={() => setTwitterIconColor(SOCIAL_ICON_COLOR_HOVER)}
                            onMouseOut={() => setTwitterIconColor(SOCIAL_ICON_COLOR)}
                            href="https://twitter.com/jsj0nes"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Icon
                                src={`https:icon.now.sh/twitter/22/${twitterIconColor}`}
                                alt="twitter account"
                            />
                            twitter
                        </SocialAccount>
                    </SocialAccountContainer>
                </Connect>
            </FooterContent>
            <Copyright>&copy; 2019-2020 Orion Labs</Copyright>
        </Container>
    );
};

export default Footer;
