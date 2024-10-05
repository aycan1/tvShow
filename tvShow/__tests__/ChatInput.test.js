import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatInput from '../src/components/ChatInput';

test('renders ChatInput component', () => {
  const mockSendMessage = jest.fn();
  render(<ChatInput sendMessage={mockSendMessage} />);
  
  const input = screen.getByPlaceholderText(/Type your message/i);
  const sendButton = screen.getByText(/Send/i);
  
  expect(input).toBeInTheDocument();
  expect(sendButton).toBeInTheDocument();
});

test('calls sendMessage when button is clicked', () => {
  const mockSendMessage = jest.fn();
  render(<ChatInput sendMessage={mockSendMessage} />);
  
  const input = screen.getByPlaceholderText(/Type your message/i);
  const sendButton = screen.getByText(/Send/i);
  
  fireEvent.change(input, { target: { value: 'Test message' } });
  fireEvent.click(sendButton);
  
  expect(mockSendMessage).toHaveBeenCalledWith('Test message');
});

test('clears input after sending message', () => {
  const mockSendMessage = jest.fn();
  render(<ChatInput sendMessage={mockSendMessage} />);
  
  const input = screen.getByPlaceholderText(/Type your message/i);
  const sendButton = screen.getByText(/Send/i);
  
  fireEvent.change(input, { target: { value: 'Test message' } });
  fireEvent.click(sendButton);
  
  expect(input.value).toBe('');
});