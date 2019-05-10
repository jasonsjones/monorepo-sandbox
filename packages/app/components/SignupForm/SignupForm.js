import { useState } from 'react';

import TextField from '../Common/TextField';
import Button from '../Common/Button';

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
                <TextField
                    type="text"
                    name="firstName"
                    label="First Name"
                    value={form.firstName}
                    handleChange={updateField}
                />
                <TextField
                    type="text"
                    name="lastName"
                    label="Last Name"
                    value={form.lastName}
                    handleChange={updateField}
                />
                <TextField
                    type="text"
                    name="email"
                    label="Email"
                    value={form.email}
                    handleChange={updateField}
                />
                <TextField
                    type="password"
                    name="password"
                    label="Password"
                    value={form.password}
                    handleChange={updateField}
                />
                <Button text="Submit" />
            </form>
        </React.Fragment>
    );
};

export default SignupForm;
