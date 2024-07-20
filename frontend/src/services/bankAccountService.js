import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

export const getBalance = async (accountNumber) => {
    // console.log('AccountNumber Type:', typeof accountNumber);

    try {
        const response = await axios.get(`${URL}/bank-accounts/balance/${accountNumber}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw error;
    }
};

export const depositAmount = async (accountNumber, amount) => {
    try {
        const response = await axios.put(`${URL}/${accountNumber}/deposit`, null, {
            params: { amount }
        });
        return response.data;
    } catch (error) {
        console.error('Error depositing amount:', error);
        throw error;
    }
};

export const withdrawAmount = async (accountNumber, amount) => {
    try {
        const response = await axios.put(`${URL}/${accountNumber}/withdraw`, null, {
            params: { amount }
        });
        return response.data;
    } catch (error) {
        console.error('Error withdrawing amount:', error);
        throw error;
    }
};

export const transferAmount = async (accountNumber, amount, recipient) => {
    try {
        const response = await axios.put(`${URL}/${accountNumber}/transfer`, null, {
            params: { amount, recipient }
        });
        return response.data;
    } catch (error) {
        console.error('Error transferring amount:', error);
        throw error;
    }
};
