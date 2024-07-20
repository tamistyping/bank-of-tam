import './App.css'
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/HomePage';
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Account from "./components/Account";

function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('user'));

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="App">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LogIn onLogin={handleLogin} />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/account" element={isAuthenticated ? <Account /> : <HomePage />} />
                    </Routes>
                </main>
                {isAuthenticated && <Footer onLogout={handleLogout} />}
            </div>
        </Router>
    );
}

export default App;
