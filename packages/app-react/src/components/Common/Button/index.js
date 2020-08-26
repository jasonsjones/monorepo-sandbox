import React from 'react';

const Button = (props) => {
    return (
        <button
            type={props.type}
            className="py-2 px-4 bg-purple-700 font-semibold rounded-md text-gray-200 hover:bg-purple-800"
        >
            {props.text}
        </button>
    );
};

export default Button;
