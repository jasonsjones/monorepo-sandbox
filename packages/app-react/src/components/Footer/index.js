import React, { useState } from 'react';
import './Footer.css';

const SOCIAL_ICON_COLOR = 'ccc';
const SOCIAL_ICON_COLOR_HOVER = 'fff';

const Footer = () => {
    const [githubIconColor, setGithubIconColor] = useState(SOCIAL_ICON_COLOR);
    const [twitterIconColor, setTwitterIconColor] = useState(SOCIAL_ICON_COLOR);

    return (
        <div className="site-footer_content">
            <section className="site-footer_about">
                <h3>About</h3>
                <p>
                    A simple playground app to explore the technical benefits and project structure
                    of a monorepo
                </p>
            </section>
            <section className="site-footer_connect">
                <h3>Connect</h3>
                <ul>
                    <li
                        onMouseOver={() => setGithubIconColor(SOCIAL_ICON_COLOR_HOVER)}
                        onMouseOut={() => setGithubIconColor(SOCIAL_ICON_COLOR)}
                    >
                        <a
                            href="https://github.com/jasonsjones"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-account"
                        >
                            <img
                                className="social-icon"
                                src={`https:icon.now.sh/github/14/${githubIconColor}`}
                                alt="github account"
                            />
                            <span className="social-name">github</span>
                        </a>
                    </li>
                    <li
                        onMouseOver={() => setTwitterIconColor(SOCIAL_ICON_COLOR_HOVER)}
                        onMouseOut={() => setTwitterIconColor(SOCIAL_ICON_COLOR)}
                    >
                        <a
                            href="https://twitter.com/jsj0nes"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-account"
                        >
                            <img
                                className="social-icon"
                                src={`https:icon.now.sh/twitter/14/${twitterIconColor}`}
                                alt="twitter account"
                            />
                            <span className="social-name">twitter</span>
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default Footer;
