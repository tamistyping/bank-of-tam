import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {createUser} from "../services/userService";
import { Container, Form, Button, Alert } from 'react-bootstrap';


const Signup = ({ onSignup }) => {
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [animal, setAnimal] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userData = {
                username,
                age: parseInt(age),
                animal,
            };
            const user = await createUser(userData);
            localStorage.setItem('user', JSON.stringify(user));
            onSignup();
            navigate('/account');
        } catch (err) {
            setError('Failed to create user');
        }
    };

    return (
        <Container className="full-height mt-5">
            <h2 className="mb-4">Sign Up Form</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formAge" className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formAnimal" className="mb-3">
                    <Form.Label>Favorite Animal</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter favorite animal"
                        value={animal}
                        onChange={(e) => setAnimal(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Sign Up
                </Button>
            </Form>
        </Container>
    );
};

export default Signup;
