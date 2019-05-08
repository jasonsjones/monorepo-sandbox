import { useState } from 'react';

import './SignupForm.css';

const SignupForm = () => {
    const [form, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleSubmit = e => {
        e.preventDefault();
        const query = `
            mutation CreateUser($firstName: String!,
                                $lastName: String!,
                                $email: String!,
                                $password: String!) {
                createUser(firstName: $firstName,
                           lastName: $lastName,
                           email: $email,
                           password: $password) {
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

        const variables = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: form.password
        };

        fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables })
        })
            .then(res => res.json())
            .then(res => console.log(res.data))
            .then(() =>
                setValues({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                })
            )
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
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        onChange={updateField}
                        value={form.firstName}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        onChange={updateField}
                        value={form.lastName}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={updateField} value={form.email} />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={updateField}
                        value={form.password}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </React.Fragment>
    );
};

export default SignupForm;