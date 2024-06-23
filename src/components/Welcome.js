import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Welcome.css';

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <div className="sidebar">
        <span className="link">
          <Link to="/create-quiz" className="link">
            <i className="fas fa-plus-circle"></i> Create Quiz
          </Link>
        </span>
        <span className="link">
          <Link to="/view-quizzes" className="link">
            <i className="fas fa-eye"></i> View Quizzes
          </Link>
        </span>
        <span className="link">
          <Link to="/results" className="link">
            <i className="fas fa-chart-bar"></i> Results
          </Link>
        </span>
      </div>
      <div className="content">
        <h2>Welcome to our Quiz Application v1.0</h2>
      </div>
    </div>
  );
};

export default WelcomePage;
