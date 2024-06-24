import React from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateQuiz.css';

const SUBJECT_CODE = {
  CODE_ENUM: ['math101', 'ban102', 'eng103'],
  NAME_ENUM: ['bangla', 'english', 'math'],
};

const validationSchema = Yup.object().shape({
  quiz_number_per_subject: Yup.array().of(
    Yup.object().shape({
      subject_code: Yup.string()
        .oneOf(SUBJECT_CODE.CODE_ENUM, 'Invalid subject code')
        .required('Please enter subject code.')
        .max(15, 'Subject code must be at most 15 characters.'),
      quiz_number: Yup.number()
        .required('Please enter quiz number.')
        .max(99, 'Quiz number must be at most 99.')
        .typeError('Quiz number must be a number.'),
    })
  ),
});

const CreateQuiz = () => {
  const navigate = useNavigate();
  const initialValues = {
    quiz_number_per_subject: [{ subject_code: '', quiz_number: '' }],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/quizes`,
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/quiz-list');
      console.log('Form submitted successfully', response.data);
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
    setSubmitting(false);
  };

  return (
    <div className="login-container">
      <h2>Create Quiz</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, errors, touched }) => (
          <Form className="login-form">
            <FieldArray name="quiz_number_per_subject">
              {({ remove, push }) => (
                <>
                  {values.quiz_number_per_subject.map((_, index) => (
                    <div key={index} className="quiz-entry">
                      <div className="quiz-header">
                        <button
                          type="button"
                          onClick={() => push({ subject_code: '', quiz_number: '' })}
                          className="add-button"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                         className="add-button"
                        >
                          x
                        </button>
                      </div>
                      <div className="quiz-fields">
                        <Field
                          name={`quiz_number_per_subject.${index}.subject_code`}
                          as="select"
                          className="login-input"
                        >
                          <option value="">Select Subject Code</option>
                          {SUBJECT_CODE.CODE_ENUM.map((code) => (
                            <option key={code} value={code}>
                              {code}
                            </option>
                          ))}
                        </Field>
                        {errors.quiz_number_per_subject?.[index]?.subject_code &&
                          touched.quiz_number_per_subject?.[index]?.subject_code && (
                            <div className="error-message">
                              {errors.quiz_number_per_subject[index].subject_code}
                            </div>
                          )}
                        <Field
                          name={`quiz_number_per_subject.${index}.quiz_number`}
                          type="number"
                          placeholder="Quiz Number"
                          className="login-input"
                        />
                        {errors.quiz_number_per_subject?.[index]?.quiz_number &&
                          touched.quiz_number_per_subject?.[index]?.quiz_number && (
                            <div className="error-message">
                              {errors.quiz_number_per_subject[index].quiz_number}
                            </div>
                          )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </FieldArray>
            <button type="submit" disabled={isSubmitting} className="login-button">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateQuiz;
