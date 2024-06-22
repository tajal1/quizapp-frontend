import React from 'react';
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
    return (
        <AuthProvider>
            <NavBar/>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route 
                        path="/result" 
                        element={
                            <ProtectedRoute>
                                <Result />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/question" 
                        element={
                            <ProtectedRoute>
                                <Question />
                            </ProtectedRoute>
                        } 
                    />
                    <Route path="/" element={ <WelcomePage/>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
