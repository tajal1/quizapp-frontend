import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get('http://localhost:3001/api/v1/questions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error('There was an error fetching the questions!', error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Question List</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Question</th>
            <th>Option A</th>
            <th>Option B</th>
            <th>Option C</th>
            <th>Option D</th>
            <th>Subject Code</th>
            <th>Subject Name</th>
            <th>Answer</th>
            <th>Positive Score</th>
            <th>Negative Score</th>
            <th>Approved</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question._id} style={styles.row}>
              <td style={styles.td}>{question.question}</td>
              <td style={styles.td}>{question.a}</td>
              <td style={styles.td}>{question.b}</td>
              <td style={styles.td}>{question.c}</td>
              <td style={styles.td}>{question.d}</td>
              <td style={styles.td}>{question.subject_code}</td>
              <td style={styles.td}>{question.subject_name}</td>
              <td style={styles.td}>{question.answer}</td>
              <td style={styles.td}>{question.positive_score}</td>
              <td style={styles.td}>{question.negetive_score}</td>
              <td style={styles.td}>{question.is_approved ? 'Yes' : 'No'}</td>
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
    margin: '20px auto',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },
  row: {
    borderBottom: '1px solid #ddd',
  },
  th: {
    borderBottom: '2px solid #ddd',
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#f8f8f8',
  },
  td: {
    padding: '10px',
    textAlign: 'left',
    borderRight: '1px solid #ddd', // Adding right border to the table cells
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  icon: {
    cursor: 'pointer',
    margin: '0 5px',
    color: '#007bff',
  },
};

export default QuestionList;
