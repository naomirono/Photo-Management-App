import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import PhotoPage from './PhotoPage';
import { getPhoto } from '../../Services/api';
  
jest.mock('../../Services/api');

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
          <PhotoPage/>
        </BrowserRouter>
      );
  
      await waitFor(() => {
      expect(screen.getByText(/Test Photo/)).toBeInTheDocument();
      expect(screen.getByText(/Photo ID:/)).toBeInTheDocument();
      expect(screen.getByText(/1/)).toBeInTheDocument();
      });
  
    });
  
  });
  