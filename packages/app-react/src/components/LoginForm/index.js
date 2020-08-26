import React, { useState } from 'react';
import { executeGqlQuery } from '../../services/dataservice';
import { useAuthDispatch } from '../../context/authContext';
import TextField from '../Common/Textfield';
import Button from '../Common/Button';

const LoginForm = ({ history }) => {
    const authDispatch = useAuthDispatch();

    const [form, setValues] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const isFormValid = () => {
        return form.email.length > 0 && form.password.length > 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = `
            mutation Login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    accessToken
                }
            }
        `;

        const variables = {
            email: form.email,
            password: form.password
        };

        if (isFormValid()) {
            setIsFetching(true);
            executeGqlQuery(query, variables).then(({ errors, data }) => {
                if (data && data.login) {
                    setError(null);
                    setIsFetching(false);
                    authDispatch({
                        type: 'USER_LOGIN_SUCCESS',
                        payload: { token: data.login.accessToken }
                    });
                    history.push('/');
                } else {
                    setTimeout(() => {
                        console.log(errors);
                        setError("Oops, something went wrong... Let's try again.");
                        setValues({ email: form.email, password: '' });
                        setIsFetching(false);
                    }, 1000);
                }
            });
        }
    };

    const updateField = (e) => {
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
                <div className="flex justify-end mt-3">
                    <Button type="submit" text={!isFetching ? 'Login' : 'Logging in...'} />
                </div>
            </form>
            {error && <p className="text-red-700">{error}</p>}
        </React.Fragment>
    );
};

export default LoginForm;
