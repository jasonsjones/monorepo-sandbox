import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const doVerifyEmail = (query, variables) => {
    return fetch('http://localhost:3000/graphql', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
    }).then(res => res.json());
};

const VerifyEmail = () => {
    const router = useRouter();
    const [message, setMessage] = useState('Verifying email now...');
    useEffect(() => {
        console.log(`will make a call to /api/verifyemail/${router.query.token}`);
        const query = `
            query VerifyEmail(
                $token: String!
            ) {
                verifyEmail(token: $token) {
                    _id
                    name {
                        first
                        last
                    }
                    email
                    isEmailVerified
                }
            }
        `;

        const variables = {
            token: router.query.token
        };

        doVerifyEmail(query, variables).then(({ data }) => {
            console.log(data);
            if (data.verifyEmail) {
                setMessage('Thank you for verifying your email!');
            }
        });
    }, []);

    return (
        <React.Fragment>
            <div className="container">
                <h2>{message}</h2>
            </div>
            <style jsx>{`
                .container {
                    margin: 20px 50px;
                    background-color: #fafafa;
                    padding: 20px;
                    height: 250px;
                    border-radius: 10px;
                    border: 2px solid lightgray;
                    box-shadow: 5px 5px 8px #ccc;
                }

                h2,
                h4 {
                    text-align: center;
                }

                @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
                    .container {
                        margin: 20px 30px;
                    }
                }
            `}</style>
        </React.Fragment>
    );
};

export default VerifyEmail;
