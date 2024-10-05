import React from 'react';
import { render, screen } from '@testing-library/react';
import MessageItem from '../src/components/MessageItem';

test('renders user message', () => {
  render(<MessageItem role="user" content="Hello" />);
  
  const userMessage = screen.getByText('Hello');
  expect(userMessage).toBeInTheDocument();
  expect(userMessage.closest('div')).toHaveClass('user-message');
});

test('renders assistant message', () => {
  render(<MessageItem role="assistant" content="Hi there!" />);
  
  const assistantMessage = screen.getByText('Hi there!');
  expect(assistantMessage).toBeInTheDocument();
  expect(assistantMessage.closest('div')).toHaveClass('assistant-message');
});