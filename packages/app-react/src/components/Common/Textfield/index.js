import React from 'react';

const TextField = (props) => {
    const {
        name = 'unknown',
        type = 'text',
        value,
        label = 'No Label',
        error = '',
        handleChange
    } = props;
    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="text-sm text-gray-600 mt-4 mb-1">
                {label}
            </label>
            <input
                type={type}
                id={name}
                onChange={handleChange}
                value={value}
                className="text-base text-purple-900 p-2 border-2 border-gray-300 rounded"
            />
            {error && <p className="text-red-700 text-sm mt-2">{error}</p>}
        </div>
    );
};

export default TextField;
