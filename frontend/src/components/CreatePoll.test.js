import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreatePoll from './CreatePoll';

global.fetch = jest.fn();
global.alert = jest.fn();

describe('CreatePoll Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    alert.mockClear();
  });

  test('renders create poll form', () => {
    render(<CreatePoll />);
    // FIX: Use getByRole to distinguish between the heading and the button
    expect(screen.getByRole('heading', { name: /Create Poll/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Question")).toBeInTheDocument();
  });

  test('validates empty fields', () => {
    render(<CreatePoll />);
    const submitBtn = screen.getByRole('button', { name: /Create Poll/i });
    fireEvent.click(submitBtn);
    expect(alert).toHaveBeenCalledWith('Please fill in all the fields');
  });

  test('submits form successfully', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Poll created successfully.' }),
    });

    render(<CreatePoll />);
    fireEvent.change(screen.getByPlaceholderText("Enter Question"), { target: { value: 'Best Framework?' } });
    fireEvent.change(screen.getByPlaceholderText("Option 1"), { target: { value: 'React' } });
    fireEvent.change(screen.getByPlaceholderText("Option 2"), { target: { value: 'Vue' } });
    fireEvent.change(screen.getByPlaceholderText("Option 3"), { target: { value: 'Angular' } });
    fireEvent.change(screen.getByPlaceholderText("Option 4"), { target: { value: 'Svelte' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Poll/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(alert).toHaveBeenCalledWith('Poll created successfully.');
    });
  });
});