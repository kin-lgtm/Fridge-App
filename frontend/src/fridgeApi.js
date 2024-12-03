import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5000/api/FridgeItems",
});

export const getFridgeItems = async () => {
  try {
    const response = await api.get('/');                          
    return response.data;
  } catch (error) {
    console.error('Error fetching fridge items:', error);
    throw error;
  }
};

export const getFridgeItem = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching fridge item with id ${id}:`, error);
    throw error;
  }
};

export const addFridgeItem = async (item) => {
  try {
    const response = await api.post('/', item);
    return response.data;
  } catch (error) {
    console.error('Error adding fridge item:', error);
    throw error;
  }
};

export const updateFridgeItem = async (id, item) => {
  try {
    const response = await api.put(`/${id}`, item);
    return response.data;
  } catch (error) {
    console.error(`Error updating fridge item with id ${id}:`, error);
    throw error;
  }
};

export const deleteFridgeItem = async (id) => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error(`Error deleting fridge item with id ${id}:`, error);
    throw error;
  }
};
