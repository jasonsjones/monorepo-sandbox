import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, getByText } from '@testing-library/react';
import { AuthStateContext } from '../../context/authContext';
import Nav from '.';

const authtUser = {
    firstName: 'Oliver',
    lastName: 'Queen',
    email: 'ollie@qc.com'
};

describe('Nav component', () => {
    afterEach(cleanup);

    const renderWithContext = ({ contextUser, isFetching }) => {
        return render(
            <MemoryRouter>
                <AuthStateContext.Provider value={{ contextUser, isFetching }}>
                    <Nav />
                </AuthStateContext.Provider>
            </MemoryRouter>
        );
    };

    it('renders a nav element', () => {
        const { getByTestId } = renderWithContext({ contextUser: false, isFetching: false });
        expect(getByTestId('nav')).toBeTruthy();
    });

    it('has h3 element with logo text', () => {
        const { getByText } = renderWithContext({ contextUser: false, isFetching: false });
        expect(getByText(/orion/i).nodeName).toBe('H3');
    });

    it('has Signup link if user is not logged in', () => {
        const { getByTestId } = renderWithContext({ contextUser: false, isFetching: false });
        expect(getByTestId('desktop-signup')).toBeTruthy();
    });

    it('has Login link if user is not logged in', () => {
        const { getByTestId } = renderWithContext({ contextUser: false, isFetching: false });
        expect(getByTestId('desktop-login')).toBeTruthy();
    });

    it('has Logout button if user is logged in', () => {
        const { getByTestId } = renderWithContext({ contextUser: authtUser, isFetching: false });
        expect(getByTestId('desktop-logout')).toBeTruthy();
    });
});
