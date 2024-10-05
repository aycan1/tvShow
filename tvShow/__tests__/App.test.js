import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('renders App component', () => {
  render(<App />);
  const headerElement = screen.getByText(/AI Chat History/i);
  expect(headerElement).toBeInTheDocument();
});