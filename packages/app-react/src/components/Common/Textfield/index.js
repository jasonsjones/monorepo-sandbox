import React from 'react';
import styled from '@emotion/styled';

const FormControl = styled.div`
    display: flex;
    flex-direction: column;
`;

const FormLabel = styled.label`
    color: #999;
    font-size: 0.75rem;
    margin: 1rem 0 0.2rem;
`;

const FormInput = styled.input`
    height: 2.5rem;
    border: 1px solid #ccc;
    font-size: 1rem;
    color: #022c43;
    border-radius: 5px;
    padding: 0 15px;
`;

const FormError = styled.p`
    color: #dd0000;
    margin: 5px 0;
    font-size: 0.75rem;
`;

const TextField = props => {
    const {
        name = 'unknown',
        type = 'text',
        value,
        label = 'No Label',
        error = '',
        handleChange
    } = props;
    return (
        <FormControl>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <FormInput type={type} id={name} onChange={handleChange} value={value} />
            {error && <FormError className="error">{error}</FormError>}
        </FormControl>
    );
};

export default TextField;
