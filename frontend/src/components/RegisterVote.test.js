import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterVote from './RegisterVote';

global.fetch = jest.fn();
global.alert = jest.fn();

const mockPollData = {
  question: "Favorite Color?",
  option1: "Red",
  option2: "Blue",
  option3: "Green",
  option4: "Yellow"
};

describe('RegisterVote Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    alert.mockClear();
  });

  test('renders poll data on load', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => mockPollData });
    render(<RegisterVote />);
    await waitFor(() => expect(screen.getByText("Favorite Color?")).toBeInTheDocument());
  });

  test('handles vote click', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => mockPollData });
    render(<RegisterVote />);
    await waitFor(() => screen.getByText("Red"));

    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ message: 'Vote registered successfully.' }) });
    fetch.mockResolvedValueOnce({ ok: true, json: async () => mockPollData });

    fireEvent.click(screen.getByText("Red"));

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith('Vote registered successfully.');
    });
  });
});