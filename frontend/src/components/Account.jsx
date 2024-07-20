import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountPage = () => {
    const [balance, setBalance] = useState(0);
    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [transferAmount, setTransferAmount] = useState('');
    const [transferRecipient, setTransferRecipient] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch the balance on component mount
        const fetchBalance = async () => {
            try {
                const response = await axios.get('http://localhost:8080/account/balance');
                setBalance(response.data.balance);
            } catch (err) {
                setError('Failed to fetch balance');
            }
        };

        fetchBalance();
    }, []);

    const handleDeposit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/account/deposit', { amount: depositAmount });
            setDepositAmount('');
            // Update balance
            setBalance(balance + parseFloat(depositAmount));
        } catch (err) {
            setError('Failed to deposit amount');
        }
    };

    const handleWithdraw = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/account/withdraw', { amount: withdrawAmount });
            setWithdrawAmount('');
            // Update balance
            setBalance(balance - parseFloat(withdrawAmount));
        } catch (err) {
            setError('Failed to withdraw amount');
        }
    };

    const handleTransfer = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/account/transfer', { amount: transferAmount, recipient: transferRecipient });
            setTransferAmount('');
            setTransferRecipient('');
            // Update balance
            setBalance(balance - parseFloat(transferAmount));
        } catch (err) {
            setError('Failed to transfer amount');
        }
    };

    return (
        <div className="account-page">
            <h1>Account Page</h1>
            {error && <p className="error">{error}</p>}
            <div className="balance">
                <h2>Balance: ${balance.toFixed(2)}</h2>
            </div>
            <form onSubmit={handleDeposit} className="form">
                <h3>Deposit</h3>
                <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="Amount"
                    required
                />
                <button type="submit">Deposit</button>
            </form>
            <form onSubmit={handleWithdraw} className="form">
                <h3>Withdraw</h3>
                <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Amount"
                    required
                />
                <button type="submit">Withdraw</button>
            </form>
            <form onSubmit={handleTransfer} className="form">
                <h3>Transfer</h3>
                <input
                    type="text"
                    value={transferRecipient}
                    onChange={(e) => setTransferRecipient(e.target.value)}
                    placeholder="Recipient Username"
                    required
                />
                <input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="Amount"
                    required
                />
                <button type="submit">Transfer</button>
            </form>
        </div>
    );
};

export default AccountPage;
