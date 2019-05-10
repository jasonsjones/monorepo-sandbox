import React from 'react';
import Router from 'next/router';
import { useContext, useState } from 'react';

import AuthContext from '../../context/AuthContext';
import TextField from '../Common/TextField';
import Button from '../Common/Button';

const doLogin = (query, variables) => {
    return fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
    })
        .then(res => res.json())
        .then(payload => payload.data);
};

const LoginForm = () => {
    const authCtx = useContext(AuthContext);

    const [form, setValues] = useState({
        email: '',
        password: ''
    });
    const handleSubmit = e => {
        e.preventDefault();
        const query = `
            query Login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                        authUser {
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

        doLogin(query, variables).then(data => {
            setValues({ email: '', password: '' });
            authCtx.login(data.login.authUser, data.login.token);
            Router.push('/');
        });
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
        </React.Fragment>
    );
};

export default LoginForm;
