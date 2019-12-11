import React, { useContext, useState } from 'react';
import styled from '@emotion/styled';

import { useFetchingCtx } from '../../context/fetchingContext';
import AuthContext from '../../context/AuthContext';
import TextField from '../Common/Textfield';
import Button from '../Common/Button';

const Error = styled.p`
    color: #d63939;
`;

const SubmitButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
`;

const doLogin = (query, variables) => {
    return fetch('http://localhost:3001/graphql', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
    }).then(res => res.json());
};

const LoginForm = ({ history }) => {
    const authCtx = useContext(AuthContext);
    const { setIsFetching } = useFetchingCtx();

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
            doLogin(query, variables).then(({ errors, data }) => {
                if (data && data.login) {
                    setError(null);
                    authCtx.login(data.login.accessToken);
                    history.push('/');
                } else {
                    console.log(errors);
                    setError("Oops, something went wrong... Let's try again.");
                    setValues({ email: form.email, password: '' });
                }
                setIsFetching(false);
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
                <SubmitButtonContainer>
                    <Button type="submit" text="Login" />
                </SubmitButtonContainer>
            </form>
            {error && <Error>{error}</Error>}
        </React.Fragment>
    );
};

export default LoginForm;
