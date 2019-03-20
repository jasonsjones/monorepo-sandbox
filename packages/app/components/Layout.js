import Nav from './Nav';
const Layout = ({ children }) => (
    <React.Fragment>
        <Nav />
        {children}
    </React.Fragment>
);

export default Layout;
