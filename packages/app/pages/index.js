import Nav from '../components/Nav';

const Home = () => (
    <React.Fragment>
        <Nav />
        <h1>Hello from Next.js</h1>

        <style jsx>{`
            h1 {
                margin: 0;
                padding: 0;
                color: #1f3c88;
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

export default Home;
