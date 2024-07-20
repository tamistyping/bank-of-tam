import React from 'react';

function Footer({ onLogout }) {
    return (
        <div className="footer">
            <button onClick={onLogout}>Logout</button>
        </div>
    );
}

export default Footer;