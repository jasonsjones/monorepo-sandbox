import { useContext, useState } from 'react';
import Link from 'next/link';
import AuthContext from '../context/AuthContext';

const Nav = () => {
    const authCtx = useContext(AuthContext);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    return (
        <React.Fragment>
            <nav>
                <div className="nav-logo">
                    <Link href="/">
                        <a>J2 Sandbox</a>
                    </Link>
                </div>
                <div className="nav-links">
                    {!authCtx.token && (
                        <Link href="/signup">
                            <a>Signup</a>
                        </Link>
                    )}

                    {!authCtx.token && (
                        <Link href="/login">
                            <a>Login</a>
                        </Link>
                    )}

                    {authCtx.token && (
                        <Link href="/users">
                            <a>Users</a>
                        </Link>
                    )}

                    {authCtx.token && (
                        <div
                            className="user-profile"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
                            <img
                                src="https:icon.now.sh/account_circle/24/cccccc"
                                alt="user account icon"
                            />
                            <span>
                                {authCtx.authUser.name.first} {authCtx.authUser.name.last}
                            </span>
                            {showProfileMenu && (
                                <div className="panel-container">
                                    <div className="panel">
                                        <p>My Account</p>
                                        <p>Logout</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>
            <style jsx>{`
                nav {
                    background-color: #022c43;
                    height: 50px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .nav-logo {
                    margin-left: 15px;
                    font-size: 1.5rem;
                }

                .nav-links {
                    display: flex;
                    align-items: center;
                    margin-right: 50px;
                    color: #ccc;
                }

                img {
                    margin-right: 5px;
                }

                .nav-logo a,
                .nav-links a {
                    margin-right: 15px;
                    text-decoration: none;
                    color: #ccc;
                }

                .user-profile {
                    position: relative;
                    display: flex;
                    align-items: center;
                    color: #ccc;
                }

                .user-profile span {
                    cursor: pointer;
                }

                .panel-container {
                    font-family: 'Arial';
                    color: #022c43;
                    position: relative;
                }

                .panel {
                    position: absolute;
                    top: 28px;
                    right: -30px;
                    border: 1px solid #ddd;
                    width: 150px;
                    box-shadow: 5px 5px 8px #ccc;
                    border-radius: 8px;
                }

                .panel p {
                    margin-left: 25px;
                }
            `}</style>
        </React.Fragment>
    );
};

export default Nav;
