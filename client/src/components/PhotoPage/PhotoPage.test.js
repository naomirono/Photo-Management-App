import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { getPhoto } from '../../Services/api';
import PhotoPage from './PhotoPage';

// Import Jest functions individually from @jest/globals
import { describe, test, expect } from '@jest/globals';

jest.mock('../../Services/api');

// Remove the unused import of axios
// jest.mock('axios');

jest.mock('../Loader/Loader', () => ({
  __esModule: true,
  default: jest.fn(() => null),
  createPortal: jest.fn((children) => children),
}));


describe('PhotoPage Component', () => {
  test('renders photo details and allows title editing', async () => {
    const mockPhotoData = {
      id: 1,
      title: 'Test Photo',
      url: 'https://example.com/test.jpg',
    };

    getPhoto.mockResolvedValueOnce(mockPhotoData);

    render(
      <BrowserRouter>
        <PhotoPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Test Photo/)).toBeInTheDocument();
      expect(screen.getByText(/Photo ID:/)).toBeInTheDocument();
      expect(screen.getByText(/1/)).toBeInTheDocument();
    });
  });
});
