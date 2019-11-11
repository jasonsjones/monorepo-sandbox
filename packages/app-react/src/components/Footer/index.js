import React from 'react';
import './Footer.css';

const Footer = () => {
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
                    <li>
                        <a
                            href="https://github.com/jasonsjones"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-account"
                        >
                            <img
                                className="social-icon"
                                src="https:icon.now.sh/github/14/fff"
                                alt="github account"
                            />
                            <span className="social-name">github</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://twitter.com/jsj0nes"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-account"
                        >
                            <img
                                className="social-icon"
                                src="https:icon.now.sh/twitter/14/fff"
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
