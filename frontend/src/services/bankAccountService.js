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
        const response = await axios.put(`${URL}/bank-accounts/${accountNumber}/deposit`, null, {
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
        const response = await axios.put(`${URL}/bank-accounts/${accountNumber}/withdraw`, null, {
            params: { amount }
        });
        return response.data;
    } catch (error) {
        console.error('Error withdrawing amount:', error);
        throw error;
    }
};

export const transferAmount = async (fromAccountNumber, toAccountNumber, amount) => {
    try {
        const response = await axios.post(`${URL}/bank-accounts/transfer`, null, {
            params: { from: fromAccountNumber, to: toAccountNumber, amount }
        });
        return response.data;
    } catch (error) {
        console.error('Error transferring amount:', error);
        throw error;
    }
};
