import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Footer({ isAuthenticated, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <div className="footer">
            {isAuthenticated && (
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
            )}
        </div>
    );
}

export default Footer;
