import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Header} from './components/layout/Header';
import {HomePage} from './components/HomePage';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={HomePage} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
