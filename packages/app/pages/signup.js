import { useState } from 'react';
import Nav from '../components/Nav';

const Signup = () => {
    const [form, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleSubmit = e => {
        e.preventDefault();
        const query = `mutation {
            createUser(
                firstName: "${form.firstName}",
                lastName: "${form.lastName}",
                email: "${form.email}",
                password:"${form.password}"
                ) {
                _id
                name {
                    first
                    last
                }
                email
                password
            }
        }
        `;
        fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    const updateField = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <React.Fragment>
            <Nav />
            <h2>Signup for an Account</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" name="firstName" onChange={updateField} />
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" name="lastName" onChange={updateField} />
                <br />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" onChange={updateField} />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" onChange={updateField} />
                <button type="submit">Submit</button>
            </form>
        </React.Fragment>
    );
};

export default Signup;
