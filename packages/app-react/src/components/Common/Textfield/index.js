import React from 'react';
import './TextField.css';

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
        <div className="form-control">
            <label htmlFor={name}>{label}</label>
            <input type={type} id={name} onChange={handleChange} value={value} />
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default TextField;
