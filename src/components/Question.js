import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const SUBJECT_CODE = {
  CODE_ENUM: ['math101', 'ban102', 'eng103'],
  NAME_ENUM: ['bangla', 'english', 'math'],
  BAN: { CODE: 'ban102', NAME: 'bangla' },
  ENG: { CODE: 'eng103', NAME: 'english' },
  MATH: { CODE: 'math101', NAME: 'math' },
};

const validationSchema = Yup.object({
  question: Yup.string().max(255, 'Question length must be at most 255 characters.').required('Please enter the question.'),
  a: Yup.string().max(255, 'Option length must be at most 255 characters.').required('Please enter option A.'),
  b: Yup.string().max(255, 'Option length must be at most 255 characters.').required('Please enter option B.'),
  c: Yup.string().max(255, 'Option length must be at most 255 characters.').required('Please enter option C.'),
  d: Yup.string().max(255, 'Option length must be at most 255 characters.').required('Please enter option D.'),
  subject_code: Yup.string().max(50, 'Subject code length must be at most 50 characters.').required('Please enter the subject code.'),
  subject_name: Yup.string().max(50, 'Subject name length must be at most 50 characters.').required('Please enter the subject name.'),
  answer: Yup.string().max(255, 'Answer length must be at most 255 characters.').required('Please enter the correct answer.'),
  positive_score: Yup.number().max(99, 'Positive score must be at most 99.').required('Please enter positive score of the question.'),
  negetive_score: Yup.number().max(99, 'Negetive score must be at most 99.').required('Please enter negetive score of the question.'),
  is_approved: Yup.boolean().required('Approval status is required.'),
});

const Question = () => {
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      question: '',
      a: '',
      b: '',
      c: '',
      d: '',
      subject_code: '',
      subject_name: '',
      answer: '',
      positive_score: '',
      negetive_score: '',
      is_approved: true,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios.post('http://localhost:3001/api/v1/questions', values, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        navigate('/question-list');
      })
      .catch(error => {
        console.error(error);
      });
    },
  });

  return (
    <div style={styles.container}>
      <h1>Question Page</h1>
      <form onSubmit={formik.handleSubmit} style={styles.form}>
        {['question', 'a', 'b', 'c', 'd', 'answer'].map((field) => (
          <div key={field} style={styles.formGroup}>
            <label htmlFor={field}>{field.replace('_', ' ').toUpperCase()}</label>
            <input
              id={field}
              name={field}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[field]}
              style={styles.input}
            />
            {formik.touched[field] && formik.errors[field] ? (
              <div style={styles.error}>{formik.errors[field]}</div>
            ) : null}
          </div>
        ))}
        <div style={styles.formGroup}>
          <label htmlFor="subject_code">Subject Code</label>
          <select
            id="subject_code"
            name="subject_code"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subject_code}
            style={styles.select}
          >
            <option value="" label="Select subject code" />
            {SUBJECT_CODE.CODE_ENUM.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          {formik.touched.subject_code && formik.errors.subject_code ? (
            <div style={styles.error}>{formik.errors.subject_code}</div>
          ) : null}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="subject_name">Subject Name</label>
          <select
            id="subject_name"
            name="subject_name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subject_name}
            style={styles.select}
          >
            <option value="" label="Select subject name" />
            {SUBJECT_CODE.NAME_ENUM.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          {formik.touched.subject_name && formik.errors.subject_name ? (
            <div style={styles.error}>{formik.errors.subject_name}</div>
          ) : null}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="positive_score">Positive Score</label>
          <input
            id="positive_score"
            name="positive_score"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.positive_score}
            style={styles.input}
          />
          {formik.touched.positive_score && formik.errors.positive_score ? (
            <div style={styles.error}>{formik.errors.positive_score}</div>
          ) : null}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="negetive_score">Negative Score</label>
          <input
            id="negetive_score"
            name="negetive_score"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.negetive_score}
            style={styles.input}
          />
          {formik.touched.negetive_score && formik.errors.negetive_score ? (
            <div style={styles.error}>{formik.errors.negetive_score}</div>
          ) : null}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="is_approved">Is Approved</label>
          <input
            id="is_approved"
            name="is_approved"
            type="checkbox"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.is_approved}
            style={styles.checkbox}
          />
          {formik.touched.is_approved && formik.errors.is_approved ? (
            <div style={styles.error}>{formik.errors.is_approved}</div>
          ) : null}
        </div>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  checkbox: {
    marginLeft: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '12px',
  },
};

export default Question;
