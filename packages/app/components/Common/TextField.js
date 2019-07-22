import React from 'react';

const TextField = props => {
    const { name = 'unknown', type = 'text', value, label = 'No Label', handleChange } = props;
    return (
        <React.Fragment>
            <div className="form-control">
                <label htmlFor={name}>{label}</label>
                <input type={type} id={name} onChange={handleChange} value={value} />
            </div>
            <style jsx>{`
                label {
                    color: #999;
                    font-size: 0.75rem;
                }

                input {
                    height: 2.5rem;
                    border: 1px solid #ccc;
                    font-size: 1rem;
                    color: #022c43;
                    border-radius: 5px;
                    padding: 0 15px;
                }

                .form-control {
                    display: flex;
                    flex-direction: column;
                }

                .form-control label {
                    margin: 1rem 0 0.2rem;
                }
            `}</style>
        </React.Fragment>
    );
};

export default TextField;
