import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import UserPage from './UserPage';

jest.mock('axios');
jest.mock('../Loader/Loader', () => {
  return {
    __esModule: true,
    default: jest.fn(() => null),
    createPortal: jest.fn((children, container) => {
      return children;
    }),
  };
});

describe('UserPage Component', () => {
  test('renders user information', async () => {
    const mockUserData = {
      userId: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      username: 'john_doe',
      website: 'www.johndoe.com',
    };

    const mockAlbumsData = [
      {
        id: 1,
        title: 'Album 1',
      },
      {
        id: 2,
        title: 'Album 2',
      },
    ];

    axios.get
      .mockImplementationOnce(() => Promise.resolve({ data: mockUserData }))
      .mockImplementationOnce(() => Promise.resolve({ data: mockAlbumsData }));

    render(
      <BrowserRouter >
      <UserPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/John Doe/)).toBeInTheDocument();
      expect(screen.getByText(/Email:/)).toBeInTheDocument();
      expect(screen.getByText(/john.doe@example.com/)).toBeInTheDocument();
      expect(screen.getByText(/Username:/)).toBeInTheDocument();
      expect(screen.getByText(/john_doe/)).toBeInTheDocument();
      expect(screen.getByText(/Website:/)).toBeInTheDocument();
      expect(screen.getByText(/www.johndoe.com/)).toBeInTheDocument();
      expect(screen.getByText(/Albums/)).toBeInTheDocument();
      expect(screen.getByText(/Album 1/)).toBeInTheDocument();
      expect(screen.getByText(/Album 2/)).toBeInTheDocument();
    });
  });

});
