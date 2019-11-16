import React from 'react';
import './Button.css';

const Button = props => {
    return (
        <button onClick={props.clickHandler} type={props.type}>
            {props.text}
        </button>
    );
};

export default Button;
