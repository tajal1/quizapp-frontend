import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return <div style={styles.error}>Error fetching the quiz result!</div>;
  }

  const totalScore = result.total_positive_score - result.total_negative_score;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Quiz Result</h2>
      <div style={styles.resultBox}>
        <p><strong>Quiz ID:</strong> {result._id}</p>
        <p><strong>Total Positive Score:</strong> {result.total_positive_score}</p>
        <p><strong>Total Negative Score:</strong> {result.total_negative_score}</p>
        <p><strong>Total Score:</strong> {totalScore}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
  },
  error: {
    fontSize: '20px',
    color: 'red',
  },
  header: {
    fontSize: '24px',
    margin: '20px 0',
    color: '#333',
  },
  resultBox: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '300px',
    textAlign: 'left',
  },
};

export default Result;
