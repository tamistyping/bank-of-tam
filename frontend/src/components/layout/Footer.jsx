import React from 'react';

function Footer({ isAuthenticated, onLogout }) {
    return (
        <div className="footer">
            {isAuthenticated && (
                <button onClick={onLogout}>Logout</button>
            )}
        </div>
    );
}

export default Footer;