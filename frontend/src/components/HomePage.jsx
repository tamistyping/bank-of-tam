import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
       navigate('/login');
    }

    const handleSignUpClick = () => {
       navigate('/signup');
    }

    return (
        <div className="home-page">
            <button onClick={handleLoginClick}>Already have an account?</button>
            <button onClick={handleSignUpClick}>Don't have an account?</button>
        </div>
    )
}
