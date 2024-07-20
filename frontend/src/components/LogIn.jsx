import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [favoriteAnimal, setFavoriteAnimal] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLoginClick = async () => {
        if (step === 1 && username) {
            try {
                // Use environment variable for the API base URL
                const apiUrl = process.env.REACT_APP_API_URL;
                const response = await axios.get(`${apiUrl}/users/${username}`);

                if (response.status === 200) {
                    setStep(2);
                } else {
                    setError('User not found');
                }
            } catch (error) {
                setError('Error connecting to backend');
            }
        } else if (step === 2 && favoriteAnimal) {
            // Assume correct answer is 'dog' for demonstration purposes
            if (favoriteAnimal.toLowerCase() === 'dog') {
                localStorage.setItem('user', username);
                navigate('/');
            } else {
                setError('Invalid answer to security question');
            }
        }
    };

    return (
        <div className="login-page">
            {error && <p className="error">{error}</p>}
            {step === 1 && (
                <div>
                    <h2>Login</h2>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={handleLoginClick}>Next</button>
                </div>
            )}
            {step === 2 && (
                <div>
                    <h2>Security Question</h2>
                    <p>What's your favorite animal?</p>
                    <input
                        type="text"
                        placeholder="Enter your answer"
                        value={favoriteAnimal}
                        onChange={(e) => setFavoriteAnimal(e.target.value)}
                    />
                    <button onClick={handleLoginClick}>Submit</button>
                </div>
            )}
        </div>
    );
};

export default Login;
