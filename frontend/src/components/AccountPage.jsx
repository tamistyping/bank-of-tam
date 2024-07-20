import React, { useState, useEffect } from 'react';
import { getBalance, depositAmount, withdrawAmount, transferAmount } from '../services/bankAccountService'; // Adjust the path as needed

const AccountPage = () => {
    const [balance, setBalance] = useState(0);
    const [depositAmountValue, setDepositAmountValue] = useState('');
    const [withdrawAmountValue, setWithdrawAmountValue] = useState('');
    const [transferAmountValue, setTransferAmountValue] = useState('');
    const [transferRecipient, setTransferRecipient] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (!userString) {
            setError('User data not found in localStorage.');
            return;
        }

        try {
            const user = JSON.parse(userString);
            const accountNo = user.accountNumber;
            // console.log('Retrieved account number:', accountNo);

            if (!accountNo) {
                setError('Account number is not available.');
                return;
            }

            const fetchBalance = async () => {
                try {
                    const response = await getBalance(accountNo);
                    setBalance(response);
                } catch (err) {
                    console.error('Error fetching balance:', err);
                    setError('Failed to fetch balance');
                }
            };

            fetchBalance();
        } catch (e) {
            setError('Failed to parse user data.');
        }
    }, []);

    const handleDeposit = async (event) => {
        event.preventDefault();
        try {
            await depositAmount(depositAmountValue);
            setDepositAmountValue('');
            setBalance(balance + parseFloat(depositAmountValue));
        } catch (err) {
            setError('Failed to deposit amount');
        }
    };

    const handleWithdraw = async (event) => {
        event.preventDefault();
        try {
            await withdrawAmount(withdrawAmountValue);
            setWithdrawAmountValue('');
            setBalance(balance - parseFloat(withdrawAmountValue));
        } catch (err) {
            setError('Failed to withdraw amount');
        }
    };

    const handleTransfer = async (event) => {
        event.preventDefault();
        try {
            await transferAmount(transferAmountValue, transferRecipient);
            setTransferAmountValue('');
            setTransferRecipient('');
            setBalance(balance - parseFloat(transferAmountValue));
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
                    value={depositAmountValue}
                    onChange={(e) => setDepositAmountValue(e.target.value)}
                    placeholder="Amount"
                    required
                />
                <button type="submit">Deposit</button>
            </form>
            <form onSubmit={handleWithdraw} className="form">
                <h3>Withdraw</h3>
                <input
                    type="number"
                    value={withdrawAmountValue}
                    onChange={(e) => setWithdrawAmountValue(e.target.value)}
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
                    value={transferAmountValue}
                    onChange={(e) => setTransferAmountValue(e.target.value)}
                    placeholder="Amount"
                    required
                />
                <button type="submit">Transfer</button>
            </form>
        </div>
    );
};

export default AccountPage;
