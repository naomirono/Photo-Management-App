import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AlbumPage from './AlbumPage';
import axios from 'axios';

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

describe('AlbumPage Component', () => {
  test('renders album information', async () => {
    const mockAlbumData = {
      id: 1,
      userId: 2,
      title: 'Test Album',
    };


    axios.get.mockImplementationOnce(() => Promise.resolve({ data: mockAlbumData }));

    render(
      <BrowserRouter>
        <AlbumPage />
      </BrowserRouter>
    );

await waitFor(() => {
    expect(screen.getByText(/Test Album Album/)).toBeInTheDocument();
    expect(screen.getByText(/Album ID:/)).toBeInTheDocument();
    expect(screen.getByText(/User ID:/)).toBeInTheDocument();
    expect(screen.getByText(/1/)).toBeInTheDocument();
    expect(screen.getByText(/2/)).toBeInTheDocument();
  });
  
    });

});
