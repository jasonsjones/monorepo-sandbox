import React from 'react';

const Button = props => {
    return (
        <React.Fragment>
            <button type="submit">{props.text}</button>
            <style jsx>{`
                button {
                    height: 2.5rem;
                    width: 80px;
                    font-size: 1rem;
                    background-color: #022c43;
                    color: #ccc;
                    border-radius: 5px;
                }
            `}</style>
        </React.Fragment>
    );
};

export default Button;
