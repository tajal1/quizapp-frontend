import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const QuizDetails = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentDetailIndex, setCurrentDetailIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizDetails = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/quizes/${quizId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuiz(response.data);
      } catch (error) {
        console.error('There was an error fetching the quiz details!', error);
      }
    };

    fetchQuizDetails();
  }, [quizId]);

  const handleStartQuiz = (subjectId) => {
    navigate(`/quiz-start/${quizId}/subject/${subjectId}`);
  };

  if (!quiz) return <div>Loading...</div>;

  const detail = quiz.quiz_details[currentDetailIndex];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate('/')} style={styles.backButton}>
          Back to Quiz List
        </button>
        <button onClick={() => handleStartQuiz(detail._id)} style={styles.startButton}>
          Start Quiz
        </button>
      </div>
      <h3>Quiz Details for ID: {quiz._id}</h3>
      <div key={detail._id} style={styles.detailContainer}>
        <h4 style={styles.subjectTitle}>Subject: {detail.subject_name} ({detail.subject_code})</h4>
        <ul>
          {detail.quizes.map((question) => (
            <li key={question._id} style={styles.questionContainer}>
              <p style={styles.questionTitle}>Question: {question.question}</p>
              <div style={styles.options}>
                <label>
                  <input type="radio" name={question._id} value="a" disabled checked={question.user_answer === 'a'} />
                  {question.a}
                </label>
                <label>
                  <input type="radio" name={question._id} value="b" disabled checked={question.user_answer === 'b'} />
                  {question.b}
                </label>
                <label>
                  <input type="radio" name={question._id} value="c" disabled checked={question.user_answer === 'c'} />
                  {question.c}
                </label>
                <label>
                  <input type="radio" name={question._id} value="d" disabled checked={question.user_answer === 'd'} />
                  {question.d}
                </label>
              </div>
              <p>{question.user_answer ? `User Answer: ${question.user_answer}` : 'Not Answered Yet'}</p>
              <p>Positive Score: {question.positive_score}</p>
              <p>Negative Score: {question.negetive_score}</p>
              <p>User Submit Status: {question.user_submit_status}</p>
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.navigationButtons}>
        <button
          onClick={() => setCurrentDetailIndex(Math.max(currentDetailIndex - 1, 0))}
          disabled={currentDetailIndex === 0}
          style={styles.navButton}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentDetailIndex(Math.min(currentDetailIndex + 1, quiz.quiz_details.length - 1))}
          disabled={currentDetailIndex === quiz.quiz_details.length - 1}
          style={styles.navButton}
        >
          Next
        </button>
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
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '800px',
  },
  backButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  startButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  detailContainer: {
    marginTop: '20px',
    width: '100%',
    maxWidth: '800px',
  },
  subjectTitle: {
    fontWeight: 'bold',
  },
  questionContainer: {
    marginBottom: '20px',
  },
  questionTitle: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
  },
  navigationButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    width: '100%',
    maxWidth: '800px',
  },
  navButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default QuizDetails;
