import axiosInstance from './axiosConfig';

export const getUsers = () => axiosInstance.get('/users');
export const getUserById = (id) => axiosInstance.get(`/users/${id}`);
export const createUser = (userData) => axiosInstance.post('/users', userData);
export const updateUser = (id, userData) => axiosInstance.put(`/users/${id}`, userData);
export const deleteUser = (id) => axiosInstance.delete(`/users/${id}`);
