import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import HomePage from './HomePage';

jest.mock('axios');

describe('HomePage Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders users', async () => {
    const mockUsersData = [
      { id: 1, name: 'John Doe', email: 'john@example.com', username: 'johndoe' },
    ];

    const mockAlbumsData = [
      { userId: 1, id: 1, title: 'Album 1' },
    ];

    axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockUsersData }));
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockAlbumsData }));

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

});
