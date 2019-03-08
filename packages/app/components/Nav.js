import Link from 'next/link';

const Nav = () => (
    <React.Fragment>
        <nav>
            <div className="nav-logo">
                <Link href="/">
                    <a>J2 Sandbox</a>
                </Link>
            </div>
            <div className="nav-links">
                <Link href="/signup">
                    <a>
                        Signup
                        <img src="https:icon.now.sh/plus/10" alt="plus icon" />
                    </a>
                </Link>

                <Link href="/users">
                    <a>Users</a>
                </Link>
            </div>
        </nav>
        <style jsx>{`
            nav {
                background-color: #f7b633;
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
                margin-right: 50px;
            }

            .nav-links a img {
                margin-left: 5px;
            }

            .nav-logo a,
            .nav-links a {
                margin-right: 15px;
                text-decoration: none;
                color: #070d59;
            }
        `}</style>
        <style jsx global>{`
            body {
                font-family: 'Arial';
                margin: 0;
                padding: 0;
            }
        `}</style>
    </React.Fragment>
);

export default Nav;
