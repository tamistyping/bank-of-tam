import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {getUserByUsername} from "../services/userService";

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
                    localStorage.setItem('user', username);
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
        <div>
            {step === 1 && (
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={handleLoginClick}>Next</button>
                </div>
            )}
            {step === 2 && (
                <div>
                    <input
                        type="text"
                        placeholder="What's your favorite animal?"
                        value={favoriteAnimal}
                        onChange={(e) => setFavoriteAnimal(e.target.value)}
                    />
                    <button onClick={handleLoginClick}>Submit</button>
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    );
}

export default Login;
