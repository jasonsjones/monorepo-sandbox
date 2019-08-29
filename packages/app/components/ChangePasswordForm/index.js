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

    const [error, setError] = useState('');

    useEffect(() => {
        if (form.confirmPassword.length > 0 && form.password !== form.confirmPassword) {
            setError('Passwords do NOT match');
        }
        if (
            (form.confirmPassword.length > 0 && form.password === form.confirmPassword) ||
            form.confirmPassword.length === 0
        ) {
            setError('');
        }
    }, [form]);

    const isFormValid = () => {
        return form.password.length > 0, form.password === form.confirmPassword;
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
                        Router.push('/login');
                    }
                    setValues({ password: '', confirmPassword: '' });
                })
                .catch(err => console.log(err));
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
                    error={error}
                    handleChange={updateField}
                />
                <Button type="submit" text="Submit" />
            </form>
        </React.Fragment>
    );
};

export default ChangePasswordForm;
