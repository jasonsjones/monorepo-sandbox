import React from 'react';
import styled from '@emotion/styled';

const FormButton = styled.button`
    height: 2.5rem;
    width: 80px;
    font-size: 1rem;
    background-color: #022c43;
    color: #ccc;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #115173;
    }
`;

const Button = props => {
    return (
        <FormButton onClick={props.clickHandler} type={props.type}>
            {props.text}
        </FormButton>
    );
};

export default Button;
