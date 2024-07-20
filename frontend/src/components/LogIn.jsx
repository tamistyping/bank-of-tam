import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserByUsername } from '../services/userService';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [favoriteAnimal, setFavoriteAnimal] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLoginClick = async () => {
        if (step === 1) {
            try {
                const user = await getUserByUsername(username);
                if (user) {
                    setStep(2);
                } else {
                    setError('Username not found');
                }
            } catch (error) {
                setError('Username not found');
            }
        } else if (step === 2) {
            try {
                const user = await getUserByUsername(username);
                if (user.animal.toLowerCase() === favoriteAnimal.toLowerCase()) {
                    localStorage.setItem('user', JSON.stringify({
                        username: user.username,
                        accountNumber: user.bankAccount ? user.bankAccount.accountNumber : null
                    }));
                    onLogin();
                    navigate('/account');
                } else {
                    setError('Invalid answer to security question');
                }
            } catch (error) {
                setError('An error occurred');
            }
        }
    };

    return (
        <Container className="full-height mt-5">
            <h2 className="mb-4 text-center">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {step === 1 && (
                <Form>
                    <Form.Group controlId="formUsername" className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleLoginClick} className="w-100">
                        Next
                    </Button>
                </Form>
            )}
            {step === 2 && (
                <Form>
                    <Form.Group controlId="formFavoriteAnimal" className="mb-3">
                        <Form.Label>What's your favorite animal?</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your favorite animal"
                            value={favoriteAnimal}
                            onChange={(e) => setFavoriteAnimal(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleLoginClick} className="w-100">
                        Submit
                    </Button>
                </Form>
            )}
        </Container>
    );
}

export default Login;
