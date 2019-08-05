import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Nav from './Nav';
import AuthContext from '../../context/AuthContext';

const authUser = {
    name: {
        first: 'Oliver',
        last: 'Queen'
    },
    email: 'ollie@qc.com'
};

const token = 'eythisisthetokenoftheauthuser1234';

describe('Nav component', () => {
    afterEach(cleanup);

    const renderWithContext = () => {
        return render(
            <AuthContext.Provider value={{ authUser, token }}>
                <Nav />
            </AuthContext.Provider>
        );
    };

    it('renders a nav element', () => {
        const { container } = render(<Nav />);
        expect(container.firstChild.nodeName).toBe('NAV');
    });

    it('has h3 element with logo text', () => {
        const { getByText } = render(<Nav />);
        expect(getByText(/orion/i).nodeName).toBe('H3');
    });

    ['Signup', 'Login'].forEach(link => {
        it(`has "${link}" link if user is not logged in`, () => {
            const { getByText } = render(<Nav />);
            expect(getByText(link).nodeName).toBe('A');
        });

        it(`link to "${link}" is not present if user is logged in`, () => {
            // need to use queryByText here since it does NOT throw if the element is NOT found
            // which is what we want; 'getByText' will throw if not found.
            const { queryByText } = renderWithContext();
            expect(queryByText(link)).toBeNull();
        });
    });

    it(`displays user's name when logged in`, () => {
        const { getByText } = renderWithContext();
        expect(getByText(`${authUser.name.first} ${authUser.name.last}`));
    });

    it(`displays two image icons when a user is logged in`, () => {
        const { container } = renderWithContext();
        expect(container.querySelectorAll('img').length).toBe(2);
    });

    it(`opens dropdown menu when the user's name is clicked`, () => {
        const { getByText } = renderWithContext();
        fireEvent.click(getByText(`${authUser.name.first} ${authUser.name.last}`));
        expect(getByText('My Profile'));
        expect(getByText('Logout'));
    });

    it(`closes dropdown menu when the user's name is clicked a second time`, () => {
        const { getByText, queryByText } = renderWithContext();
        fireEvent.click(getByText(`${authUser.name.first} ${authUser.name.last}`));
        expect(getByText('My Profile'));
        expect(getByText('Logout'));

        fireEvent.click(getByText(`${authUser.name.first} ${authUser.name.last}`));
        expect(queryByText('My Profile')).toBeNull();
        expect(queryByText('Logout')).toBeNull();
    });

    it(`the chevron down image gets a class of 'open' when the username is clicked`, () => {
        const { container, getByText } = renderWithContext();
        expect(container.querySelector('img[alt="chevron down"]').classList).not.toContain('open');
        fireEvent.click(getByText(`${authUser.name.first} ${authUser.name.last}`));
        expect(container.querySelector('img[alt="chevron down"]').classList).toContain('open');
    });

    it(`auth context logout is called when the 'Logout' link is clicked from the dropdown`, () => {
        const logout = jest.fn();
        const { getByText } = render(
            <AuthContext.Provider value={{ authUser, token, logout }}>
                <Nav />
            </AuthContext.Provider>
        );

        // trigger the dropdown by clicking the user's name
        fireEvent.click(getByText(`${authUser.name.first} ${authUser.name.last}`));
        fireEvent.click(getByText('Logout'));
        expect(logout).toHaveBeenCalled();
    });
});
