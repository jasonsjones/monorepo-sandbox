import React from 'react';
import Nav from '../../components/Nav';
import Banner from '../../components/Banner';
import './Layout.css';

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

/*
const doQuery = query => {
    return fetch('http://localhost:3000/graphql', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
    })
        .then(res => res.json())
        .then(payload => payload);
};

const fetchAuthUser = doQuery;
const doLogout = doQuery;
*/

const Layout = ({ children }) => {
    /*
    const [authUser, setAuthUser] = useState(null);
    const [token, setToken] = useState(accessToken);

    if (token && !authUser) {
        const query = `query {
            me {
                name {
                    first
                    last
                }
                email
            }
        }`;
        if (process.browser) {
            fetchAuthUser(query).then(({ data }) => setAuthUser(data.me));
        }
    }

    const updateAuthUser = user => {
        setAuthUser({ ...authUser, ...user, ...authUser.name, ...user.name });
    };

    const login = (user, token) => {
        setAuthUser(user);
        setToken(token);
    };

    const logout = () => {
        const logoutQuery = `query { logout }`;
        doLogout(logoutQuery).then(({ data }) => {
            if (data.logout) {
                setAuthUser(null);
                setToken('');
                Router.push('/');
            }
        });
    };
    */

    return (
        <div className="site-container">
            <header className="site-header"></header>
            <main className="site-content">
                <Nav />
                <Banner />
                <div className="content-container">{children}</div>
            </main>
            <footer className="site-footer">
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;
