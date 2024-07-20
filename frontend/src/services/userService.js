import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

export const getUserByUsername = async (username) => {
    try {
        const response = await axios.get(`${URL}/users/username/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error getting user by username:', error);
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error getting all users:', error);
        throw error;
    }
};

export const getUser = async (id) => {
    try {
        const response = await axios.get(`${URL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting user by ID:', error);
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${URL}/users`, userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
