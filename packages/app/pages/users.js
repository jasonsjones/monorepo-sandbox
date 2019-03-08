import Link from 'next/link';
import Nav from '../components/Nav';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        const query = `{users{_id email}}`;
        fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    users: res.data.users
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        const { users } = this.state;
        return (
            <React.Fragment>
                <Nav />
                <h1>Users</h1>
                {users.length > 0 && users.map(user => <p key={user._id}>{user.email}</p>)}
                <style jsx>{`
                    h1 {
                        font-family: 'Arial';
                        margin: 0;
                        padding: 0;
                        color: #1f3c88;
                    }
                `}</style>
            </React.Fragment>
        );
    }
}

export default Users;
