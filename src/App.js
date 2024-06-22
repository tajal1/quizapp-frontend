import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import Result from './components/Result';
import Question from './components/Question';
import WelcomePage from './components/Welcome';
import NavBar from './components/NavBar';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'));

    const handleLogin = (token) => {
        localStorage.setItem('access_token', token);
        setIsLoggedIn(true);
    };
    const token = localStorage.removeItem('access_token');;
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/welcome" element={
                    <ProtectedRoute>
                        <WelcomePage />
                    </ProtectedRoute>
                } />
                {/* Add other routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;

