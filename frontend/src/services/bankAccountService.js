import axios from 'axios';

const URL = process.env.REACT_APP_BASE_URL;

export const getBalance = async (accountNumber) => {
    try {
        const response = await axios.get(`${URL}/balance/${accountNumber}`);

        return response.data;
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw error;
    }
};