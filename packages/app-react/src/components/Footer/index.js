import React, { useState } from 'react';
import styled from '@emotion/styled';
// import './Footer.css';

const SOCIAL_ICON_COLOR = 'ccc';
const SOCIAL_ICON_COLOR_HOVER = 'fff';

const Container = styled.div`
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
    }
`;

const Connect = styled.section`
    & ul {
        list-style-type: none;
        padding: 0;
    }
    & a {
        text-decoration: none;
        color: #ccc;
    }
    & a:hover {
        color: #fff;
    }

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        margin: 0;
    }
`;

const Account = styled.a`
    display: flex;
    align-items: center;
    margin-top: 10px;
`;

const Icon = styled.img`
    margin-right: 10px;
`;

const Footer = () => {
    const [githubIconColor, setGithubIconColor] = useState(SOCIAL_ICON_COLOR);
    const [twitterIconColor, setTwitterIconColor] = useState(SOCIAL_ICON_COLOR);

    return (
        <Container>
            <About>
                <h3>About</h3>
                <p>
                    A simple playground app to explore the technical benefits and project structure
                    of a monorepo
                </p>
            </About>
            <Connect>
                <h3>Connect</h3>
                <ul>
                    <li
                        onMouseOver={() => setGithubIconColor(SOCIAL_ICON_COLOR_HOVER)}
                        onMouseOut={() => setGithubIconColor(SOCIAL_ICON_COLOR)}
                    >
                        <Account
                            href="https://github.com/jasonsjones"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Icon
                                src={`https:icon.now.sh/github/14/${githubIconColor}`}
                                alt="github account"
                            />
                            github
                        </Account>
                    </li>
                    <li
                        onMouseOver={() => setTwitterIconColor(SOCIAL_ICON_COLOR_HOVER)}
                        onMouseOut={() => setTwitterIconColor(SOCIAL_ICON_COLOR)}
                    >
                        <Account
                            href="https://twitter.com/jsj0nes"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Icon
                                src={`https:icon.now.sh/twitter/14/${twitterIconColor}`}
                                alt="twitter account"
                            />
                            twitter
                        </Account>
                    </li>
                </ul>
            </Connect>
        </Container>
    );
};

export default Footer;
