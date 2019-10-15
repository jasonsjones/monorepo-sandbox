import React from 'react';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
});
