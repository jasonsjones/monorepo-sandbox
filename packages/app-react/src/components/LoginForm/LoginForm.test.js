import React from 'react';
import { render, cleanup } from '@testing-library/react';
import LoginForm from '.';

describe('LoginForm component', () => {
    afterEach(cleanup);

    it('renders a form element', () => {
        const { container } = render(<LoginForm />);
        expect(container.firstChild.nodeName.toLowerCase()).toBe('form');
    });
});
