import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
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
        const { container } = renderWithContext({ contextUser: false, isFetching: false });
        expect(container.firstChild.nodeName).toBe('NAV');
    });

    it('has h3 element with logo text', () => {
        const { getByText } = renderWithContext({ contextUser: false, isFetching: false });
        expect(getByText(/orion/i).nodeName).toBe('H3');
    });

    it('has Signup link if user is not logged in', () => {
        const { getByText } = renderWithContext({ contextUser: false, isFetching: false });
        expect(getByText('Signup').nodeName).toBe('A');
    });

    it('has Login link if user is not logged in', () => {
        const { getByText } = renderWithContext({ contextUser: false, isFetching: false });
        expect(getByText('Login').nodeName).toBe('A');
    });

    it('has Logout button if user is logged in', () => {
        const { getByText } = renderWithContext({ contextUser: authtUser, isFetching: false });
        expect(getByText('Logout').nodeName).toBe('BUTTON');
    });
});
