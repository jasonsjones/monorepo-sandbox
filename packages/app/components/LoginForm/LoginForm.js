import React from 'react';
import Router from 'next/router';
import { useContext, useState } from 'react';

import AuthContext from '../../context/AuthContext';
import './LoginForm.css';

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
                <button type="submit">Login</button>
            </form>
        </React.Fragment>
    );
};

export default LoginForm;
