import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';  // Ensure this file exists and is correctly named
import HomePage from './components/HomePage';
import Login from './components/LogIn';  // Ensure this file exists and is correctly named
import Signup from './components/SignUp';  // Ensure this file exists and is correctly named

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;