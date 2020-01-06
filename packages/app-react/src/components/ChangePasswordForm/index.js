import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import TextField from '../Common/Textfield';
import Button from '../Common/Button';
import { executeGqlQuery } from '../../services/dataservice';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
`;

const Error = styled.p`
    color: #cc0000;
`;

const ChangePasswordForm = ({ token, handleSuccess }) => {
    const [form, setValues] = useState({
        password: '',
        confirmPassword: ''
    });

    const [fieldError, setFieldError] = useState('');
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        if (form.confirmPassword.length > 0 && form.password !== form.confirmPassword) {
            setFieldError('Passwords do NOT match');
        }
        if (
            (form.confirmPassword.length > 0 && form.password === form.confirmPassword) ||
            form.confirmPassword.length === 0
        ) {
            setFieldError('');
        }
    }, [form]);

    const isFormValid = () => {
        return form.password.length > 0 && form.password === form.confirmPassword;
    };

    const handleSubmit = e => {
        e.preventDefault();
        const query = `
            mutation ChangePassword($token: String!, $password: String!) {
                changePassword(token: $token, password: $password) {
                    success
                    message
                    payload {
                        user {
                            name
                            email
                        }
                    }
                }
            }
        `;

        const variables = {
            token,
            password: form.password
        };

        if (isFormValid()) {
            console.log('submitting change password form...');
            console.log(variables);
            executeGqlQuery(query, variables).then(({ data }) => {
                if (data && data.changePassword) {
                    const { success, message } = data.changePassword;
                    setValues({
                        password: '',
                        confirmPassword: ''
                    });
                    if (success) {
                        setSubmitError('');
                        handleSuccess();
                    } else {
                        console.log('message ', message);
                        setSubmitError(message);
                    }
                }
            });
        } else {
            setSubmitError('Please verify new password and try again.');
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
                    type="password"
                    name="password"
                    label="Password"
                    value={form.password}
                    handleChange={updateField}
                />
                <TextField
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    value={form.confirmPassword}
                    error={fieldError}
                    handleChange={updateField}
                />
                <ButtonContainer>
                    <Button type="submit" text="Submit" />
                </ButtonContainer>
            </form>
            {submitError && <Error>{submitError}</Error>}
        </React.Fragment>
    );
};

export default ChangePasswordForm;
