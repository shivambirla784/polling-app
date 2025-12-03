import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ViewResult from './ViewResult';

global.fetch = jest.fn();

const mockPollResults = {
  question: "Favorite Color?",
  option1: "Red", option1Votes: 10, option1Percentage: 50,
  option2: "Blue", option2Votes: 5, option2Percentage: 25,
  option3: "Green", option3Votes: 5, option3Percentage: 25,
  option4: "Yellow", option4Votes: 0, option4Percentage: 0
};

describe('ViewResult Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('fetches and displays results correctly', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPollResults,
    });

    render(<ViewResult />);

    await waitFor(() => {
      expect(screen.getByText("Favorite Color?")).toBeInTheDocument();
      expect(screen.getByText(/10 votes/)).toBeInTheDocument();
    });

    const progressBars = screen.getAllByTestId('progress-bar');
    expect(progressBars[0]).toHaveStyle('width: 50%');
  });
});