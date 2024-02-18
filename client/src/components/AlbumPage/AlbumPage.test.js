import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, } from 'react-router-dom';
import axios from 'axios';
import AlbumPage from './AlbumPage';

jest.mock('axios');

jest.mock('../Loader/Loader', () => ({
  __esModule: true,
  default: jest.fn(() => null),
  createPortal: jest.fn((children) => children),
}));
describe('AlbumPage Component', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url.includes('/albums/')) {
        return Promise.resolve({ data: { id: 1, userId: 1, title: 'Test Album' } });
      } else if (url.includes('/photos?albumId=')) {
        return Promise.resolve({ data: [{ id: 1, title: 'Photo 1', thumbnailUrl: 'url/to/photo1' }] });
      }
      return Promise.reject(new Error('Invalid URL'));
    });
  });

  test('renders AlbumPage component with album information', async () => {
    render(
      <BrowserRouter>
        <AlbumPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Test Album Album/)).toBeInTheDocument();
      expect(screen.getByText(/Album ID:/)).toBeInTheDocument();
      expect(screen.getByText(/User ID:/)).toBeInTheDocument();
    });

  });
  
});
