import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/questions', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setQuestions(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the questions!', error);
    });
  }, [token]);

  const handleEdit = (id) => {
    navigate(`/edit-question/${id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/v1/questions/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setQuestions(questions.filter(question => question._id !== id));
    })
    .catch(error => {
      console.error('There was an error deleting the question!', error);
    });
  };

  return (
    <div style={styles.container}>
      <h1>Question List</h1>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map(question => (
            <tr key={question._id}>
              <td>{question.question}</td>
              <td>{question.a}</td>
              <td>{question.b}</td>
              <td>{question.c}</td>
              <td>{question.d}</td>
              <td>{question.subject_code}</td>
              <td>{question.subject_name}</td>
              <td>{question.answer}</td>
              <td>{question.positive_score}</td>
              <td>{question.negetive_score}</td>
              <td>{question.is_approved ? 'Yes' : 'No'}</td>
              <td>
                <FaEdit style={styles.icon} onClick={() => handleEdit(question._id)} />
                <FaTrash style={styles.icon} onClick={() => handleDelete(question._id)} />
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
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },
  td: {
    borderBottom: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },
  icon: {
    cursor: 'pointer',
    margin: '0 5px',
  }
};

export default QuestionList;
