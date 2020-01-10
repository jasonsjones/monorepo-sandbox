import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Spinner from '.';

describe('Spinner component', () => {
    afterEach(cleanup);

    it('renders a Spinner', () => {
        const { container } = render(<Spinner />);
        expect(container.firstChild.nodeName).toBe('DIV');
    });
});
