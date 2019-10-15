import React, { useEffect, useState } from 'react';
import Router from 'next/router';

import TextField from '../Common/TextField';
import Button from '../Common/Button';

const doChange = (query, variables) => {
    return fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
    }).then(res => res.json());
};

const ChangePasswordForm = ({ token }) => {
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
            mutation ChangePassword(
                $password: String!
                $token: String!
            ) {
                changePassword(
                    password: $password
                    token: $token
                )
            }
        `;

        const variables = {
            password: form.password,
            token
        };

        if (isFormValid()) {
            doChange(query, variables)
                .then(({ data }) => {
                    if (data.changePassword) {
                        setSubmitError('');
                        Router.push('/login');
                    } else {
                        setSubmitError('Password reset was unsuccessful');
                    }
                    setValues({ password: '', confirmPassword: '' });
                })
                .catch(err => console.log(err));
        } else {
            setSubmitError('Password field is required');
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
                <Button type="submit" text="Submit" />
            </form>
            {submitError && <p className="error">{submitError}</p>}

            <style jsx>{`
                .error {
                    color: #cc0000;
                }
            `}</style>
        </React.Fragment>
    );
};

export default ChangePasswordForm;
