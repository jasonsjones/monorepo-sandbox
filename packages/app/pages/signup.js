import Nav from '../components/Nav';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.firstNameEl = React.createRef();
        this.lastNameEl = React.createRef();
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };
    }

    handleSubmit = evt => {
        evt.preventDefault();
        this.setState(
            {
                firstName: this.firstNameEl.current.value,
                lastName: this.lastNameEl.current.value,
                email: this.emailEl.current.value,
                password: this.passwordEl.current.value
            },
            () => console.log(this.state)
        );

        const query = `{version}`;
        fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    render = () => {
        return (
            <React.Fragment>
                <Nav />
                <h2>Signup for an Account</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" ref={this.firstNameEl} />
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" ref={this.lastNameEl} />
                    <br />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" ref={this.emailEl} />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" ref={this.passwordEl} />
                    <button type="submit">Submit</button>
                </form>
            </React.Fragment>
        );
    };
}
export default Signup;
