import React from 'react';
import user from '@testing-library/user-event';
import { render, cleanup } from '@testing-library/react';
import { registerSa11yMatcher } from '@sa11y/jest';
import TextField from '.';

describe('TextField component', () => {
    beforeAll(() => {
        registerSa11yMatcher();
    });

    afterEach(cleanup);

    it('is accessible with default props', async () => {
        const { container } = render(<TextField />);
        expect(container).toBeAccessible();
    });

    it('with default props renders a div', () => {
        const { container } = render(<TextField />);
        expect(container.firstChild.nodeName).toBe('DIV');
    });

    it('with default props renders a single label and input', () => {
        const { container } = render(<TextField />);
        expect(container.querySelectorAll('label')).toHaveLength(1);
        expect(container.querySelectorAll('input')).toHaveLength(1);
    });

    it('displays the label value', () => {
        const props = { label: 'Test Label' };
        const { getByText } = render(<TextField {...props} />);
        expect(getByText('Test Label').nodeName).toBe('LABEL');
    });

    it('displays an input of the provide type', () => {
        const props = { label: 'Email', type: 'email' };
        const { getByLabelText } = render(<TextField {...props} />);
        expect(getByLabelText('Email').getAttribute('type')).toBe('email');
    });

    it('displays the input with the provided value', () => {
        const props = { label: 'Email', type: 'email', value: 'oliver', handleChange: () => {} };
        const { getByLabelText } = render(<TextField {...props} />);
        expect(getByLabelText('Email').value).toBe('oliver');
    });

    it('displays error text when error prop is provided', () => {
        const props = {
            label: 'Email',
            type: 'email',
            value: 'oliver',
            error: 'Some error message',
            handleChange: () => {}
        };
        const { getByText } = render(<TextField {...props} />);
        expect(getByText('Some error message')).toBeTruthy();
    });

    it(`calls 'handleChange' prop when value changes`, async () => {
        const handleChange = jest.fn();
        const props = { label: 'Email', type: 'email', value: 'oliver', handleChange };
        const { getByLabelText } = render(<TextField {...props} />);
        const input = getByLabelText('Email');
        await user.type(input, 'oliver@');
        expect(handleChange).toHaveBeenCalled();
    });
});
