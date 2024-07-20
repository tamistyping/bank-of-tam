import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {createUser} from "../services/userService";


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
        <div className="form-container">
            <h2>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input
                        id="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="animal">Favorite Animal:</label>
                    <input
                        id="animal"
                        type="text"
                        value={animal}
                        onChange={(e) => setAnimal(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
