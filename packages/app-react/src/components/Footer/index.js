import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
    const [githubIconColor, setGithubIconColor] = useState('ccc');
    const [twitterIconColor, setTwitterIconColor] = useState('ccc');

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
                        onMouseOver={() => setGithubIconColor('fff')}
                        onMouseOut={() => setGithubIconColor('ccc')}
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
                        onMouseOver={() => setTwitterIconColor('fff')}
                        onMouseOut={() => setTwitterIconColor('ccc')}
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
