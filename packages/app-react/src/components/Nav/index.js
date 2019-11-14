import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './Nav.css';
// import ProfileMenu from '../ProfileMenu/ProfileMenu';

const Nav = () => {
    const authCtx = useContext(AuthContext);
    // const [showProfileMenu, setShowProfileMenu] = useState(false);

    const isAuthed = authCtx.authUser && authCtx.token;
    // const isFetching = !authCtx.authUser && authCtx.token;

    return (
        <React.Fragment>
            <nav>
                <div className="nav-logo">
                    <Link to="/">
                        <div className="logo-text_container">
                            <h3 className="logo-text_primary">Orion</h3>
                            <p className="logo-text_secondary">labs</p>
                        </div>
                    </Link>
                </div>
                <div className="nav-links">
                    {!isAuthed && <Link to="/signup">Signup</Link>}
                    {!isAuthed && <Link to="/login">Login</Link>}
                </div>
                {/* <div className="nav-links">

                    {isAuthed && (
                        <Link href="/users">
                            <a>Users</a>
                        </Link>
                    )}

                    {isAuthed && (
                        <div
                            className="user-profile"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
                            <img
                                src="https:icon.now.sh/account_circle/24/cccccc"
                                alt="user account"
                            />
                            <span>
                                {authCtx.authUser.name.first} {authCtx.authUser.name.last}
                            </span>
                            <img
                                className={`${showProfileMenu ? 'open' : ''}`}
                                src="https:icon.now.sh/chevronDown/16/cccccc"
                                alt="chevron down"
                            />
                            <ProfileMenu show={showProfileMenu} onLogout={authCtx.logout} />
                        </div>
                    )}
                </div> */}
            </nav>
            {/* <style jsx>{`
                nav {
                    height: 80px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgb(2, 0, 36);
                    background: linear-gradient(90deg, #020024 0%, #022c43 40%, #064f77 100%);
                }

                .nav-logo {
                    margin-left: 35px;
                }

                .logo-text_container {
                    width: 100px;
                    text-align: right;
                }
                .logo-text_primary {
                    margin: 0;
                    font-size: 1.75rem;
                    color: #ff8600e6;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }

                .logo-text_secondary {
                    margin: -5px 0 0 0;
                    font-weight: 300;
                    font-size: 1.1rem;
                }

                .nav-links {
                    display: flex;
                    align-items: center;
                    margin-right: 50px;
                    color: #ccc;
                    font-size: 1.25rem;
                }

                .nav-links a:hover,
                .nav-logo a:hover {
                    color: #fff;
                }

                img {
                    margin: 0 5px;
                    cursor: pointer;
                    transition: 0.4s;
                }

                img.open {
                    transition: 0.4s;
                    transform: rotate(180deg);
                }

                .nav-logo a,
                .nav-links a {
                    margin-right: 45px;
                    text-decoration: none;
                    color: #ccc;
                }

                .nav-links a {
                    border: 1px solid #ccc;
                    padding: 10px 20px;
                    border-radius: 10px;
                    color: #ff8600e6;
                    background-color: #022c43;
                }

                .nav-links a:hover {
                    background: #020024;
                    color: #ccc;
                    border: 1px solid #ff8600e6;
                }

                .user-profile {
                    position: relative;
                    display: flex;
                    align-items: center;
                    color: #ccc;
                }

                .user-profile:hover {
                    color: #fff;
                }

                .user-profile span {
                    cursor: pointer;
                }

                @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
                    .nav-logo {
                        font-size: 1.25rem;
                    }
                    .nav-links {
                        margin-right: 15px;
                    }
                    .panel {
                        right: -10px;
                    }
                }
            `}</style> */}
        </React.Fragment>
    );
};

export default Nav;
