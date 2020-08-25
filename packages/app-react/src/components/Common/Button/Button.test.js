import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { registerSa11yMatcher } from '@sa11y/jest';
import Button from '.';

describe('Button component', () => {
    beforeAll(() => {
        registerSa11yMatcher();
    });

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

    it('is accessible', async () => {
        const buttonText = 'Sa11y';
        const { container } = render(<Button text={buttonText} />);
        await expect(container).toBeAccessible();
    });
});
