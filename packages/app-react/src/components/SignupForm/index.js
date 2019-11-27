import React, { useState } from 'react';

import TextField from '../Common/Textfield';
import Button from '../Common/Button';

const doSignup = (query, variables) => {
    return fetch('http://localhost:3001/graphql', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
    }).then(res => res.json());
};

const SignupForm = ({ onRegister }) => {
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
            mutation RegisterUser($input: RegisterInput!) {
                registerUser(input: $input) {
                    success
                    message
                    payload {
                        user {
                            id
                            firstName
                            lastName
                            name
                            email
                            isEmailVerified
                        }
                    }
                }
            }
        `;

        const variables = {
            input: {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                password: form.password
            }
        };

        if (isFormValid()) {
            doSignup(query, variables)
                .then(({ data }) => {
                    if (data) {
                        setValues({ firstName: '', lastName: '', email: '', password: '' });
                        onRegister();
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
    );
};

export default SignupForm;