import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const QuizStart = () => {
  const { quizId, subjectId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizDetails = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get( `${process.env.REACT_APP_API_URL}/quizes/${quizId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuiz(response.data);
      } catch (error) {
        console.error('There was an error fetching the quiz details!', error);
      }
    };

    fetchQuizDetails();
  }, [quizId]);

  const handleAnswerChange = (quizId, answer) => {
    setUserAnswers({
      ...userAnswers,
      [quizId]: answer,
    });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('access_token');
    const payload = {
      quizes: Object.keys(userAnswers).map((key) => ({
        _id: key,
        user_answer: userAnswers[key],
      })),
    };
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/quizes/${quizId}/subject/${subjectId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Quiz submitted!');
      // let isAllSubjectSubmitted =  
      // quiz.quiz_details.forEach(element => {
      // });
      navigate(`/quiz-details/${quizId}`)
    } catch (error) {
      console.error('There was an error submitting the quiz!', error);
    }
  };

  const backToQuizdetails = async () =>{
    navigate(`/quiz-details/${quizId}`)
  }

  if (!quiz) return <div>No content found</div>;

  const detail = quiz.quiz_details?.find((d) => d._id === subjectId);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate('/quiz-list')} style={styles.backButton}>
          Quiz List
        </button>
      </div>
      <h3>Start Quiz for Subject: {detail?.subject_name} ({detail?.subject_code})</h3>
      <div key={detail?._id} style={styles.detailContainer}>
        <ul>
          {detail?.quizes.map((question) => (
            <li key={question._id} style={styles.questionContainer}>
              <p style={styles.questionTitle}>Question: {question.question}</p>
              <div style={styles.options}>
                <label>
                  <input
                    type="radio"
                    name={question._id}
                    value="a"
                    disabled={detail?.subject_quiz_submit_status === 'submit'}
                    checked={userAnswers[question._id] === 'a'}
                    onChange={() => handleAnswerChange(question._id, 'a')}
                  />
                  {question.a}
                </label>
                <label>
                  <input
                    type="radio"
                    name={question._id}
                    value="b"
                    disabled={detail?.subject_quiz_submit_status === 'submit'}
                    checked={userAnswers[question._id] === 'b'}
                    onChange={() => handleAnswerChange(question._id, 'b')}
                  />
                  {question.b}
                </label>
                <label>
                  <input
                    type="radio"
                    name={question._id}
                    value="c"
                    disabled={detail?.subject_quiz_submit_status === 'submit'}
                    checked={userAnswers[question._id] === 'c'}
                    onChange={() => handleAnswerChange(question._id, 'c')}
                  />
                  {question.c}
                </label>
                <label>
                  <input
                    type="radio"
                    name={question._id}
                    value="d"
                    disabled={detail?.subject_quiz_submit_status === 'submit'}
                    checked={userAnswers[question._id] === 'd'}
                    onChange={() => handleAnswerChange(question._id, 'd')}
                  />
                  {question.d}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.navigationButtons}>
      <button onClick = {backToQuizdetails} style={styles.navButton}>
          Back
        </button>
        <button onClick={handleSubmit} style={styles.navButton}>
          Submit Quiz
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
  submitButton: {
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

export default QuizStart;
