import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Result = () => {
  const { quizId } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchQuizResult = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.patch(`http://localhost:3001/api/v1/quizes/score/${quizId}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResult(response.data);
      } catch (error) {
        console.error('There was an error fetching the quiz result!', error);
      }
    };

    fetchQuizResult();
  }, [quizId]);

  if (!result) {
    return <div style={styles.loading}>Loading...</div>;
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
  loading: {
    fontSize: '20px',
    color: '#333',
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
  resultText: {
    margin: '10px 0',
    fontSize: '18px',
    color: '#555',
  },
};

export default Result;
