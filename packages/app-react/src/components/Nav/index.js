import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAuthState, useAuthDispatch } from '../../context/authContext';
import { executeGqlQuery } from '../../services/dataservice';
// import ProfileMenu from '../ProfileMenu/ProfileMenu';

const NavContainer = styled.nav`
    height: 12vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgb(2, 0, 36);
    background: linear-gradient(0deg, #020024 0%, #022c43 40%, #064f77 100%);

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        height: 15vh;
    }
`;

const Logo = styled.div`
    margin-left: 2rem;
    padding-top: 20px;

    & a {
        margin-right: 45px;
        text-decoration: none;
        color: #ccc;
    }

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        margin-left: 0.75rem;
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
        margin: -2px 0 0;
        padding: 0 10px 1px 0;
        font-weight: bold;
        font-size: 1.25rem;
        color: navy;
        border-radius: 10px;
    }

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        & h3 {
            font-size: 1.5rem;
        }
        & p {
            font-size: 1rem;
            margin: 1px 0 0;
        }
    }
`;

const SecondaryText = styled.div`
    background-color: #ff8600e6;
    border-radius: 10px;
    margin-left: 40%;
`;

const NavLinks = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.25rem;

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        margin-right: 0.5rem;
        font-size: 1rem;
    }
`;

const StyledLink = styled(Link)`
    margin-right: 2rem;
    text-decoration: none;
    border: 1px solid #ff8600e6;
    padding: 10px 20px;
    border-radius: 10px;
    color: #ff8600e6;
    background-color: #022c43;

    &:hover {
        background: #020024;
        color: #ccc;
        border: 1px solid #ccc;
    }
`;

const LogoutButton = styled.button`
    margin-right: 2rem;
    border: 1px solid #ff8600e6;
    padding: 10px 20px;
    border-radius: 10px;
    color: #ff8600e6;
    background-color: #022c43;
    font-size: 1.25rem;

    &:hover {
        background: #020024;
        color: #ccc;
        border: 1px solid #ccc;
    }
`;

const Nav = () => {
    const authState = useAuthState();
    const authDispatch = useAuthDispatch();
    const { isFetching, contextUser } = authState;
    const handleLogout = () => {
        const query = `
            mutation {
                logout
            }
        `;

        authDispatch({ type: 'USER_LOGOUT_REQUEST' });
        executeGqlQuery(query).then(({ data }) => {
            if (data.logout) {
                authDispatch({ type: 'USER_LOGOUT_SUCCESS' });
            }
        });
    };

    return (
        <NavContainer>
            <Logo>
                <Link to="/">
                    <LogoText>
                        <h3>Orion</h3>
                        <SecondaryText>
                            <p>labs</p>
                        </SecondaryText>
                    </LogoText>
                </Link>
            </Logo>
            <NavLinks>
                {!isFetching && !contextUser && (
                    <React.Fragment>
                        <StyledLink to="/login">Login</StyledLink>
                        <StyledLink to="/signup">Signup</StyledLink>
                    </React.Fragment>
                )}
                {!isFetching && contextUser && (
                    <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                )}
            </NavLinks>
        </NavContainer>
    );
};

export default Nav;

// TODO: below ref from nextjs version
/*

const [showProfileMenu, setShowProfileMenu] = useState(false);
const isAuthed = authCtx.authUser && authCtx.token;
const isFetching = !authCtx.authUser && authCtx.token;

<div className="nav-links">

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
</div>
*/
