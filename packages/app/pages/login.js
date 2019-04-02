import { useContext, useState } from 'react';
import Router from 'next/router';

import AuthContext from '../context/AuthContext';

const doLogin = (query, variables) => {
    return fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
    })
        .then(res => res.json())
        .then(payload => payload.data);
};

const Login = () => {
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
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" onChange={updateField} value={form.email} />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    onChange={updateField}
                    value={form.password}
                />
                <button type="submit">Login</button>
            </form>
        </React.Fragment>
    );
};

export default Login;
