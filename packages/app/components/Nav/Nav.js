import { useContext, useState } from 'react';
import Link from 'next/link';
import AuthContext from '../../context/AuthContext';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import './Nav.css';

const Nav = () => {
    const authCtx = useContext(AuthContext);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const isAuthed = authCtx.authUser && authCtx.token;
    const isFetching = !authCtx.authUser && authCtx.token;

    return (
        <React.Fragment>
            <nav>
                <div className="nav-logo">
                    <Link href="/">
                        <a>
                            <div className="logo-text_container">
                                <h3 className="logo-text_primary">Orion</h3>
                                <p className="logo-text_secondary">labs</p>
                            </div>
                        </a>
                    </Link>
                </div>
                <div className="nav-links">
                    {!isAuthed &&
                        (!isFetching && (
                            <Link href="/signup">
                                <a>Signup</a>
                            </Link>
                        ))}

                    {!isAuthed &&
                        (!isFetching && (
                            <Link href="/login">
                                <a>Login</a>
                            </Link>
                        ))}

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
                            {showProfileMenu && <ProfileMenu onLogout={authCtx.logout} />}
                        </div>
                    )}
                </div>
            </nav>
        </React.Fragment>
    );
};

export default Nav;
