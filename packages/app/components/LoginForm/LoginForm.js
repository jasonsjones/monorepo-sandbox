import React from 'react';
import Router from 'next/router';
import { useContext, useState } from 'react';

import AuthContext from '../../context/AuthContext';
import TextField from '../Common/TextField';
import Button from '../Common/Button';

const doLogin = (query, variables) => {
    return fetch('http://localhost:3000/graphql', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
    })
        .then(res => res.json())
        .then(payload => payload);
};

const LoginForm = () => {
    const authCtx = useContext(AuthContext);

    const [form, setValues] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);

    const isFormValid = () => {
        return form.email.length > 0 && form.password.length > 0;
    };

    const handleSubmit = e => {
        e.preventDefault();
        const query = `
            query Login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    authUser {
                        _id,
                        name {
                            first
                            last
                        }
                        email
                    }
                    token
                }
            }
        `;

        const variables = {
            email: form.email,
            password: form.password
        };

        if (isFormValid()) {
            doLogin(query, variables).then(({ data }) => {
                if (data.login) {
                    setError(null);
                    authCtx.login(data.login.authUser, data.login.token);
                    Router.push('/');
                } else {
                    setError("Oops, something went wrong... Let's try again.");
                    setValues({ email: form.email, password: '' });
                }
            });
        }
    };

    const updateField = e => {
        setValues({
            ...form,
            [e.target.id]: e.target.value
        });

        if (error) {
            setError(null);
        }
    };

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
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
                <Button text="Login" />
            </form>
            {error && <p style={{ color: '#d63939' }}>{error}</p>}
        </React.Fragment>
    );
};

export default LoginForm;
