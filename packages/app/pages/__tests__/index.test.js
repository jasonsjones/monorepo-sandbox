import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Home from '../index';

afterEach(cleanup);
describe('Index page', () => {
    it('renders Welcome text', () => {
        const { getByText } = render(<Home />);
        expect(getByText(/Welcome/)).toBeTruthy();
    });
});
