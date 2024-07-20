import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';

const HomePage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    }

    const handleSignUpClick = () => {
        navigate('/signup');
    }

    return (
        <Container fluid className="d-flex align-items-start justify-content-center min-vh-100 bg-light p-5">
            <Row className="w-100">
                <Col md={8} lg={6} className="mx-auto">
                    <Card className="text-center shadow border-0 p-4">
                        <Card.Body>
                            <Card.Title as="h1" className="display-4 mb-4 text-primary">Welcome to Bank of Tam</Card.Title>
                            <Card.Text className="mb-4 lead text-muted">
                                Bank of Tam is a personal banking application designed to provide a seamless and intuitive banking experience. Whether you're looking to manage your account or explore financial services, our platform offers a user-friendly interface with essential features to meet your needs.
                            </Card.Text>
                            <div className="d-flex flex-column align-items-center">
                                <Button
                                    variant="primary"
                                    className="mb-3 px-4 py-2 rounded-pill"
                                    style={{ width: '70%' }}
                                    onClick={handleLoginClick}
                                >
                                    Already have an account?
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="px-4 py-2 rounded-pill"
                                    style={{ width: '70%' }}
                                    onClick={handleSignUpClick}
                                >
                                    Don't have an account?
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;
