import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Since App renders Routes inside BrowserRouter (in index.js usually), 
// but here App contains Routes directly, we need to wrap App in Router for testing if it's not already wrapped.
// Looking at your App.js, it does NOT include <BrowserRouter>, so we must wrap it in tests.

// Mock child components to simplify routing tests
jest.mock('./components/CreatePoll', () => () => <div>Create Poll Page</div>);
jest.mock('./components/RegisterVote', () => () => <div>Register Vote Page</div>);
jest.mock('./components/ViewResult', () => () => <div>View Result Page</div>);

describe('App Routing', () => {
  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Create Poll/i)).toBeInTheDocument();
    expect(screen.getByText(/Register Vote/i)).toBeInTheDocument();
    expect(screen.getByText(/View Result/i)).toBeInTheDocument();
  });

  test('navigates to Create Poll page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Create Poll Page')).toBeInTheDocument();
  });

  test('navigates to Register Vote page', () => {
    render(
      <MemoryRouter initialEntries={['/register-vote']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Register Vote Page')).toBeInTheDocument();
  });

  test('navigates to View Result page', () => {
    render(
      <MemoryRouter initialEntries={['/view-result']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('View Result Page')).toBeInTheDocument();
  });
});