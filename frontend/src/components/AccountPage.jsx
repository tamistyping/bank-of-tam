import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { getBalance, depositAmount, withdrawAmount, transferAmount } from '../services/bankAccountService';

const AccountPage = () => {
    const [balance, setBalance] = useState(0);
    const [depositAmountValue, setDepositAmountValue] = useState('');
    const [withdrawAmountValue, setWithdrawAmountValue] = useState('');
    const [transferAmountValue, setTransferAmountValue] = useState('');
    const [transferRecipient, setTransferRecipient] = useState('');
    const [error, setError] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (!userString) {
            setError('User data not found in localStorage.');
            return;
        }

        try {
            const user = JSON.parse(userString);
            const accountNo = user.accountNumber;
            const userName = user.username;

            if (!accountNo || !userName) {
                setError('Account number or username is not available.');
                return;
            }

            setAccountNumber(accountNo);
            setUsername(userName);

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
            if (accountNumber && depositAmountValue) {
                await depositAmount(accountNumber, parseFloat(depositAmountValue));
                setDepositAmountValue('');
                const updatedBalance = await getBalance(accountNumber);
                setBalance(updatedBalance);
                setError('');
            } else {
                setError('Account number or deposit amount is missing.');
            }
        } catch (err) {
            setError('Failed to deposit amount');
        }
    };

    const handleWithdraw = async (event) => {
        event.preventDefault();
        try {
            if (accountNumber && withdrawAmountValue) {
                await withdrawAmount(accountNumber, parseFloat(withdrawAmountValue));
                setWithdrawAmountValue('');
                const updatedBalance = await getBalance(accountNumber);
                setBalance(updatedBalance);
                setError('');
            } else {
                setError('Account number or withdrawal amount is missing.');
            }
        } catch (err) {
            setError('Failed to withdraw amount');
        }
    };

    const handleTransfer = async (event) => {
        event.preventDefault();
        try {
            if (accountNumber && transferAmountValue && transferRecipient) {
                await transferAmount(accountNumber, transferRecipient, parseFloat(transferAmountValue));
                setTransferAmountValue('');
                setTransferRecipient('');
                const updatedBalance = await getBalance(accountNumber);
                setBalance(updatedBalance);
                setError('');
            } else {
                setError('Account number, transfer amount, or recipient is missing.');
            }
        } catch (err) {
            setError('Failed to transfer amount');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <h1 className="text-center mb-4">Account Page</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="mb-4 text-center">
                        <h4>Hey {username}, your account number is {accountNumber}.</h4>
                    </div>
                    <Card className="mb-3">
                        <Card.Body className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
                            <Card.Title className="text-center w-50">Balance: £{balance.toFixed(2)}</Card.Title>
                        </Card.Body>
                    </Card>
                    <Form onSubmit={handleDeposit} className="mb-4">
                        <Form.Group controlId="formDeposit">
                            <Form.Label>Deposit Amount</Form.Label>
                            <Form.Control
                                type="number"
                                value={depositAmountValue}
                                onChange={(e) => setDepositAmountValue(e.target.value)}
                                placeholder="Enter amount"
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Deposit
                        </Button>
                    </Form>
                    <Form onSubmit={handleWithdraw} className="mb-4">
                        <Form.Group controlId="formWithdraw">
                            <Form.Label>Withdraw Amount</Form.Label>
                            <Form.Control
                                type="number"
                                value={withdrawAmountValue}
                                onChange={(e) => setWithdrawAmountValue(e.target.value)}
                                placeholder="Enter amount"
                                required
                            />
                        </Form.Group>
                        <Button variant="danger" type="submit" className="mt-3">
                            Withdraw
                        </Button>
                    </Form>
                    <Form onSubmit={handleTransfer}>
                        <Form.Group controlId="formTransferRecipient">
                            <Form.Label>Recipient Account Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={transferRecipient}
                                onChange={(e) => setTransferRecipient(e.target.value)}
                                placeholder="Enter recipient account number"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formTransferAmount" className="mt-3">
                            <Form.Label>Transfer Amount</Form.Label>
                            <Form.Control
                                type="number"
                                value={transferAmountValue}
                                onChange={(e) => setTransferAmountValue(e.target.value)}
                                placeholder="Enter amount"
                                required
                            />
                        </Form.Group>
                        <Button variant="success" type="submit" className="mt-3 mb-5">
                            Transfer
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AccountPage;

