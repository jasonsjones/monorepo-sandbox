import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Button from '.';

describe('Button component', () => {
    afterEach(cleanup);

    it('renders a button', () => {
        const { container } = render(<Button />);
        expect(container.firstChild.nodeName).toBe('BUTTON');
    });

    it('renders a button with the right text', () => {
        const buttonText = 'Click Me!';
        const { getByText } = render(<Button text={buttonText} />);
        expect(getByText(buttonText).nodeName).toBe('BUTTON');
    });
});
