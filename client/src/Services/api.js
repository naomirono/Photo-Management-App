import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getPhoto = async (photoId) => {
  const response = await api.get(`/photos/${photoId}`);
  return response.data;
};

export const updatePhotoTitle = async (photoId, newTitle) => {
  const response = await api.patch(`/photos/${photoId}`, { title: newTitle });
  return response.data;
};

