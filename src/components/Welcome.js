import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Welcome.css';

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <div className="sidebar">

      <span className="link">
          <Link to="/question" className="link">
            <i className="fas fa-plus-circle"></i> Question
          </Link>
        </span>

        <span className="link">
          <Link to="/question-list" className="link">
          <i className="fas fa-eye"></i> Question List
          </Link>
        </span>

        <span className="link">
          <Link to="/create-quiz" className="link">
            <i className="fas fa-plus-circle"></i> Create Quiz
          </Link>
        </span>
        <span className="link">
          <Link to="/quiz-list" className="link">
            <i className="fas fa-eye"></i> Quiz
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
