import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Footer from '.';

describe('Footer component', () => {
    afterEach(cleanup);

    it('renders a div element', () => {
        const { container } = render(<Footer />);
        expect(container.firstChild.nodeName.toLowerCase()).toBe('footer');
    });
});
