import React from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        .typeError('Quiz number must be a number.')
    })
  )
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
        'http://localhost:3001/api/v1/quizes',
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting, errors, touched }) => (
        <Form>
          <FieldArray name="quiz_number_per_subject">
            {({ insert, remove, push }) => (
              <div>
                {values.quiz_number_per_subject.length > 0 &&
                  values.quiz_number_per_subject.map((field, index) => (
                    <div key={index} style={styles.fieldRow}>
                      <Field
                        name={`quiz_number_per_subject.${index}.subject_code`}
                        as="select"
                        style={styles.select}
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
                          <div style={styles.error}>
                            {errors.quiz_number_per_subject[index].subject_code}
                          </div>
                        )}
                      <Field
                        name={`quiz_number_per_subject.${index}.quiz_number`}
                        type="number"
                        placeholder="Quiz Number"
                        style={styles.input}
                      />
                      {errors.quiz_number_per_subject?.[index]?.quiz_number &&
                        touched.quiz_number_per_subject?.[index]?.quiz_number && (
                          <div style={styles.error}>
                            {errors.quiz_number_per_subject[index].quiz_number}
                          </div>
                        )}
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        style={styles.button}
                      >
                        x
                      </button>
                    </div>
                  ))}
                <button
                  type="button"
                  onClick={() => push({ subject_code: '', quiz_number: '' })}
                  style={styles.button}
                >
                  +
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit" disabled={isSubmitting} style={styles.submitButton}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

const styles = {
  fieldRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  select: {
    marginRight: '10px',
  },
  input: {
    marginRight: '10px',
  },
  button: {
    marginLeft: '10px',
  },
  submitButton: {
    marginTop: '10px',
  },
  error: {
    color: 'red',
    marginLeft: '10px',
  },
};

export default CreateQuiz;

