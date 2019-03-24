import { useContext, useState } from 'react';

import AuthContext from '../context/AuthContext';

const doLogin = query => {
    return fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
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
        const query = `query {
            login(
                email: "${form.email}",
                password:"${form.password}"
                ) {
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

        doLogin(query).then(data => {
            setValues({ email: '', password: '' });
            console.log(data);
            authCtx.login(data.login.authUser, data.login.token);
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
