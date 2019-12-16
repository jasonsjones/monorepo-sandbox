import React, { useState } from 'react';
import styled from '@emotion/styled';

import { executeGqlQuery } from '../../services/dataservice';
import { useAuthCtx } from '../../context/authContext';
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

const LoginForm = ({ history }) => {
    const { state, dispatch } = useAuthCtx();
    const { isFetching } = state;

    const [form, setValues] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    // const [isFetching, setIsFetching] = useState(false);

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
            dispatch({ type: 'USER_LOGIN_REQUEST' });
            // setIsFetching(true);
            executeGqlQuery(query, variables).then(({ errors, data }) => {
                if (data && data.login) {
                    setError(null);
                    dispatch({
                        type: 'USER_LOGIN_SUCCESS',
                        payload: { token: data.login.accessToken }
                    });
                    // setIsFetching(false);
                    history.push('/');
                } else {
                    console.log(errors);
                    setError("Oops, something went wrong... Let's try again.");
                    setValues({ email: form.email, password: '' });
                    dispatch({ type: 'USER_LOGIN_ERROR', payload: { errors } });
                    // setIsFetching(false);
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
                <SubmitButtonContainer>
                    <Button type="submit" text={!isFetching ? 'Login' : 'Logging in...'} />
                </SubmitButtonContainer>
            </form>
            {error && <Error>{error}</Error>}
        </React.Fragment>
    );
};

export default LoginForm;
