import React from 'react';
import user from '@testing-library/user-event';
import { render, cleanup, act } from '@testing-library/react';
import ChangePasswordForm from '.';
import * as Services from '../../services/dataservice';

const result = Promise.resolve({
    data: {
        changePassword: {
            success: true,
            message: 'password changed',
        },
    },
});

Services.executeGqlQuery = jest.fn(() => result);

describe('ChangePasswordForm component', () => {
    afterEach(cleanup);

    it('renders a form element', () => {
        const { container } = render(<ChangePasswordForm />);
        expect(container.firstChild.nodeName.toLowerCase()).toBe('form');
    });

    it('error message is NOT visible by default', () => {
        const { queryByTestId } = render(<ChangePasswordForm />);
        expect(queryByTestId('error')).toBeNull();
    });

    it('displays error if password is empty when submitting', () => {
        const { getByText } = render(<ChangePasswordForm />);
        const submitButton = getByText('Submit');
        user.click(submitButton);
        const error = getByText('Please verify new password and try again.');
        expect(error).toBeTruthy();
    });

    it('displays error if passwords do not match ', async () => {
        const { getByLabelText, getByText } = render(<ChangePasswordForm />);
        const pwdInput = getByLabelText('Password');
        const confirmInput = getByLabelText('Confirm Password');
        const submitButton = getByText('Submit');

        await user.type(pwdInput, 'secretpassword');
        await user.type(confirmInput, 'secretpassw0rd');
        user.click(submitButton);

        const error = getByText('Please verify new password and try again.');
        expect(error).toBeTruthy();
    });

    it('submits new password when both passwords match', async () => {
        const { getByLabelText, getByText } = render(
            <ChangePasswordForm handleSuccess={() => {}} />
        );
        const pwdInput = getByLabelText('Password');
        const confirmInput = getByLabelText('Confirm Password');
        const submitButton = getByText('Submit');

        await user.type(pwdInput, 'secretpassword');
        await user.type(confirmInput, 'secretpassword');
        user.click(submitButton);

        expect(Services.executeGqlQuery).toHaveBeenCalled();
        await act(() => result);
    });
});
