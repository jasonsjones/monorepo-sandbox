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
                        <a>J2 Sandbox</a>
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
                                alt="user account icon"
                            />
                            <span>
                                {authCtx.authUser.name.first} {authCtx.authUser.name.last}
                            </span>
                            <img
                                className={`${showProfileMenu ? 'open' : ''}`}
                                src="https:icon.now.sh/chevronDown/16/cccccc"
                                alt="user account icon"
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
