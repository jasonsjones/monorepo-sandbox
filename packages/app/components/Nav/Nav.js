import { useContext, useState } from 'react';
import Link from 'next/link';
import AuthContext from '../../context/AuthContext';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import './Nav.css';

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

                    {authCtx.authUser && authCtx.token && (
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
                            {showProfileMenu && <ProfileMenu onLogout={authCtx.logout} />}
                        </div>
                    )}
                </div>
            </nav>
        </React.Fragment>
    );
};

export default Nav;
