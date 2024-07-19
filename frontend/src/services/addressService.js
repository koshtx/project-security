import api from './api';

export const getAddresses = async () => {
  const response = await api.get('/addresses');
  return response.data;
};

export const getUserAddresses = async (id) => {
  const response = await api.get(`/addresses/user/${id}`);
  return response.data;
};

export const getAddress = async (id) => {
  const response = await api.get(`/addresses/${id}`);
  return response.data;
};

export const addAddress = async (addressData) => {
  const response = await api.post('/addresses', addressData);
  return response.data;
};

export const updateAddress = async (id, addressData) => {
  const response = await api.put(`/addresses/${id}`, addressData);
  return response.data;
};

export const deleteAddress = async (id) => {
  const response = await api.delete(`/addresses/${id}`);
  return response.data;
};

export const setPrimaryAddress = async (userId, addressId) => {
  console.log(userId);
  const response = await api.put(`/addresses/${addressId}/setPrimary?userId=${userId}`)
  return response.data;
};