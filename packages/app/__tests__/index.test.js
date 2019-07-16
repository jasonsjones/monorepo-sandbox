import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Home from '../pages/index';

describe('Index page', () => {
    afterEach(cleanup);

    it('renders a h1', () => {
        const { container } = render(<Home />);
        expect(container.firstChild.nodeName).toBe('H1');
    });

    it('renders Welcome text', () => {
        const { getByText } = render(<Home />);
        expect(getByText(/Welcome/)).toBeTruthy();
    });
});
