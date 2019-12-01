import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import AuthContext from '../../context/AuthContext';
// import ProfileMenu from '../ProfileMenu/ProfileMenu';

const NavContainer = styled.nav`
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgb(2, 0, 36);
    background: linear-gradient(0deg, #020024 0%, #022c43 40%, #064f77 100%);

    & a {
        text-decoration: none;
    }
`;

const Logo = styled.div`
    margin-left: 35px;
    padding-top: 20px;

    & a {
        margin-right: 45px;
        text-decoration: none;
        color: #ccc;
    }

    @media (min-device-width: 375px) and (max-device-width: 667px) {
        margin-left: 1rem;
        padding-top: 1rem;
    }
`;

const LogoText = styled.div`
    width: 100px;
    text-align: right;

    & h3 {
        margin: 0;
        font-size: 1.75rem;
        color: #ff8600e6;
        text-transform: uppercase;
        letter-spacing: 2px;
    }

    & p {
        margin: -5px 0 0 0;
        font-weight: 300;
        font-size: 1.1rem;
        color: #ccc;
    }
`;

const NavLinks = styled.div`
    display: flex;
    align-items: center;
    margin-right: 50px;
    color: #ccc;
    font-size: 1.25rem;

    & a {
        margin-right: 45px;
        text-decoration: none;
        border: 2px solid #ff8600e6;
        padding: 10px 20px;
        border-radius: 10px;
        color: #ff8600e6;
        background-color: #022c43;
    }

    & a:hover {
        background: #020024;
        color: #ccc;
        border: 2px solid #ccc;
    }

    @media (min-device-width: 375px) and (max-device-width: 667px) {
        margin-right: 0.5rem;

        & a {
            margin-right: 1rem;
        }
    }
`;

const Nav = () => {
    const authCtx = useContext(AuthContext);
    // const [showProfileMenu, setShowProfileMenu] = useState(false);

    const isAuthed = authCtx.accessToken;
    // const isAuthed = authCtx.authUser && authCtx.token;
    // const isFetching = !authCtx.authUser && authCtx.token;

    return (
        <NavContainer>
            <Logo>
                <Link to="/">
                    <LogoText>
                        <h3>Orion</h3>
                        <p>labs</p>
                    </LogoText>
                </Link>
            </Logo>
            <NavLinks>
                {!isAuthed && <Link to="/signup">Signup</Link>}
                {!isAuthed && <Link to="/login">Login</Link>}
            </NavLinks>
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
        </NavContainer>
    );
};

export default Nav;
