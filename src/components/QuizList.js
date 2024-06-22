import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get('http://localhost:3001/api/v1/quizes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizzes(response.data);
      } catch (error) {
        console.error('There was an error fetching the quizzes!', error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDelete = async (quizId, quizDetailsId, quizQuestionId) => {
    const token = localStorage.getItem('access_token');
    try {
      await axios.delete(`http://localhost:3001/api/v1/quizes/${quizId}/details/${quizDetailsId}/questions/${quizQuestionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes(quizzes.map(quiz => {
        if (quiz._id === quizId) {
          return {
            ...quiz,
            quiz_details: quiz.quiz_details.map(detail => {
              if (detail._id === quizDetailsId) {
                return {
                  ...detail,
                  quizes: detail.quizes.filter(question => question._id !== quizQuestionId)
                };
              }
              return detail;
            })
          };
        }
        return quiz;
      }));
    } catch (error) {
      console.error('There was an error deleting the quiz question!', error);
    }
  };

  const handleEdit = (id) => {
    // Handle edit logic
    console.log('Edit quiz with ID:', id);
  };

  return (
    <div style={styles.container}>
      <h2>Quiz List</h2>
      {quizzes.map(quiz => (
        <div key={quiz._id}>
          <h3>Quiz ID: {quiz._id}</h3>
          {quiz.quiz_details.map(detail => (
            <div key={detail._id}>
              <h4>Subject: {detail.subject_name} ({detail.subject_code})</h4>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Positive Score</th>
                    <th>Negative Score</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.quizes.map(question => (
                    <tr key={question._id}>
                      <td>{question.question}</td>
                      <td>{question.answer}</td>
                      <td>{question.positive_score}</td>
                      <td>{question.negetive_score}</td>
                      <td>
                        <button onClick={() => handleEdit(question._id)} style={styles.button}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(quiz._id, detail._id, question._id)} style={styles.button}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ))}
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
    button: {
      marginRight: '10px',
    },
  };
  
  export default QuizList;