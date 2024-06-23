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
import QuestionList from './components/QuestionList';
import CreateQuiz from './components/CreateQuiz';
import QuizList from './components/QuizList';
import QuizDetails from './components/QuizDetails';
import QuizStart from './components/QuizStart';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'));

    const handleLogin = (token) => {
        localStorage.setItem('access_token', token);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/welcome" element={
                    <ProtectedRoute>
                        <WelcomePage />
                    </ProtectedRoute>
                } />

                <Route path="/question" element={
                    <ProtectedRoute>
                        <Question />
                    </ProtectedRoute>
                } />

                <Route path="/question-list" element={
                    <ProtectedRoute>
                        <QuestionList />
                    </ProtectedRoute>
                } />

                <Route path="/create-quiz" element={
                    <ProtectedRoute>
                        <CreateQuiz />
                    </ProtectedRoute>
                } />

                <Route path="/quiz-list" element={
                    <ProtectedRoute>
                        <QuizList />
                    </ProtectedRoute>
                } />

                <Route path="/quiz-details/:quizId" element={
                    <ProtectedRoute>
                        <QuizDetails />
                    </ProtectedRoute>
                } />

                <Route path="/quiz-start/:quizId/subject/:subjectId" element={
                    <ProtectedRoute>
                        <QuizStart />
                    </ProtectedRoute>
                } />

                <Route path="/quiz-score/:quizId" element={
                    <ProtectedRoute>
                        <Result />
                    </ProtectedRoute>
                } />

            </Routes>
        </Router>
    );
};

export default App;

