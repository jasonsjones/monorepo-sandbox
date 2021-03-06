import Router from 'next/router';
import { useState } from 'react';

import TextField from '../Common/TextField';
import Button from '../Common/Button';

const doSignup = (query, variables) => {
    return fetch('http://localhost:3000/graphql', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
    }).then(res => res.json());
};

const SignupForm = () => {
    const [form, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const isFormValid = () => {
        return (
            form.firstName.length > 0 &&
            form.lastName.length > 0 &&
            form.email.length > 0 &&
            form.password.length > 0
        );
    };

    const handleSubmit = e => {
        e.preventDefault();
        const query = `
            mutation CreateUser(
                $firstName: String!,
                $lastName: String!,
                $email: String!,
                $password: String!
            ) {
                createUser(
                    firstName: $firstName,
                    lastName: $lastName,
                    email: $email,
                    password: $password
                ) {
                    _id
                    name {
                        first
                        last
                    }
                    email
                }
            }
        `;

        const variables = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: form.password
        };

        if (isFormValid()) {
            doSignup(query, variables)
                .then(({ data }) => {
                    if (data) {
                        setValues({ firstName: '', lastName: '', email: '', password: '' });
                        Router.push('/aftersignup');
                    }
                })
                .catch(err => console.log(err));
        }
    };

    const updateField = e => {
        setValues({
            ...form,
            [e.target.id]: e.target.value
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
                <Button type="submit" text="Submit" />
            </form>
        </React.Fragment>
    );
};

export default SignupForm;
