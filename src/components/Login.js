
import axios from 'axios';
import '../styles/Login.css';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);


  useEffect(() => {
    if (emailTouched) {
      if (!email) setEmailError('Please enter an email address.');
      else if (!/\S+@\S+\.\S+/.test(email)) setEmailError('Should be a valid email address.');
      else setEmailError('');
    }
  }, [email, emailTouched]);

  useEffect(() => {
    if (passwordTouched) {
      if (!password) setPasswordError('Please enter a password.');
      else if (password.length > 50) setPasswordError('Password length must be at most 50 characters.');
      else setPasswordError('');
    }
  }, [password, passwordTouched]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError || passwordError) return;

    try {
      const response = await axios.post('http://localhost:3001/api/v1/auth/login', { email, password });
      if (response?.data?.access_token) {
        onLogin(response?.data?.access_token);
        navigate('/welcome');
      } else toast.error('Wrong login credentials')
    } catch (error) { toast.error('Wrong login credentials!') }
  };

  return (
    <div className="login-container">

      <h2>Login Page</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-container">
          {emailError && <div className="error-message">{emailError}</div>}
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailTouched(true);
            }}
            placeholder="Email"
            className="login-input"
          />
        </div>
        <div className="input-container">
          {passwordError && <div className="error-message">{passwordError}</div>}
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordTouched(true);
            }}
            placeholder="Password"
            className="login-input"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
