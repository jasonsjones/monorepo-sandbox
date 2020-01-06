import React from 'react';
import styled from '@emotion/styled';
import ChangePasswordForm from '../../components/ChangePasswordForm';

const Container = styled.div`
    max-width: 1280px;
    margin: 20px auto 0;
    text-align: center;

    @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
        margin: 1.25rem;
    }
`;

const ChangePasswordContainer = styled.div`
    max-width: 460px;
    margin: 0 auto;
    text-align: left;
`;

const ChangePassword = ({ match, history }) => {
    const onSuccess = () => {
        history.push('/login');
    };

    return (
        <Container>
            <h2>Change Password</h2>
            <ChangePasswordContainer>
                <ChangePasswordForm token={match.params.token} handleSuccess={onSuccess} />
            </ChangePasswordContainer>
        </Container>
    );
};

export default ChangePassword;
