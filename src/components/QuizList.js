import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/quizes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizzes(response.data);
      } catch (error) {
        console.error('There was an error fetching the quizzes!', error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDetailsClick = (quizId) => {
    navigate(`/quiz-details/${quizId}`);
  };

  return (
    <div style={styles.container}>
      <h2>Quiz List</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Total Positive Score</th>
            <th>Total Negative Score</th>
            <th>Submit Status</th>
            <th>Score</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz._id} style={styles.row}>
              <td>{quiz._id}</td>
              <td>{quiz.total_positive_score}</td>
              <td>{quiz.total_negative_score}</td>
              <td>{quiz.submit_status}</td>
              <td>{quiz.score}</td>
              <td>
                <button
                  onClick={() => handleDetailsClick(quiz._id)}
                  style={styles.detailsButton}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  row: {
    border: '1px solid #ddd',
  },
  detailsButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default QuizList;
