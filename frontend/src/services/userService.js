import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL;

export const getAllUsers = () => {
    try{
        const response = axios.get(`${URL}/users`);
        return response.data;
    } catch {
        console.error("Error getting users", error);
        throw error;
    }
};

export const getUser =  (id) => {
    try{
        const response =  axios.get(`${URL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error getting user", error);
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const response =  axios.post(`${URL}/users`, userData);
        return response.data;
    } catch (error) {
        console.error("Error creating user", error);
        throw error;
    }
}