import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatHistory from '../src/components/ChatHistory';

const mockMessages = [
  { role: 'user', content: 'Hello' },
  { role: 'assistant', content: 'Hi there!' },
];

test('renders ChatHistory component with messages', () => {
  render(<ChatHistory messages={mockMessages} />);
  
  const userMessage = screen.getByText('Hello');
  const assistantMessage = screen.getByText('Hi there!');
  
  expect(userMessage).toBeInTheDocument();
  expect(assistantMessage).toBeInTheDocument();
});

test('renders ChatHistory component with no messages', () => {
  render(<ChatHistory messages={[]} />);
  
  const noMessagesText = screen.getByText(/No messages yet/i);
  expect(noMessagesText).toBeInTheDocument();
});