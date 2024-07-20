import React from 'react';
import { Container } from 'react-bootstrap';

const Header = () => {
    return (
        <header className="text-center py-4">
            <Container>
                <img
                    src={`${process.env.PUBLIC_URL}/bank-icon.png`} // Correctly reference the image from the public directory
                    alt="Bank of Tam"
                    style={{ height: '80px', width: 'auto' }} // Adjust size as needed
                    className="img-fluid"
                />
            </Container>
        </header>
    );
};

export default Header;
