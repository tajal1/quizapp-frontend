import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    if (usernameTouched) {
      if (!username) {
        setUsernameError('Please enter a username.');
      } else {
        setUsernameError('');
      }
    }
  }, [username, usernameTouched]);

  useEffect(() => {
    if (usernameTouched) {
      if (!username) {
        setUsernameError('Please enter a username.');
      } else if (username.length > 50) {
        setUsernameError('username length must be at most 50 characters.');
      } else {
        setUsernameError('');
      }
    }
  }, [username, usernameTouched]);


  useEffect(() => {
    if (emailTouched) {
      if (!email) {
        setEmailError('Please enter an email address.');
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        setEmailError('Should be a valid email address.');
      } else {
        setEmailError('');
      }
    }
  }, [email, emailTouched]);

  useEffect(() => {
    if (passwordTouched) {
      if (!password) {
        setPasswordError('Please enter a password.');
      } else if (password.length > 50) {
        setPasswordError('Password length must be at most 50 characters.');
      } else {
        setPasswordError('');
      }
    }
  }, [password, passwordTouched]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usernameError || emailError || passwordError) return;

    try {
      const response = await axios.post('http://localhost:3001/api/v1/users', { username, email, password });
      console.log(response.data)
      if (response.data._id) {
        navigate('/login');
      } else {
        setEmailError('Registration failed. Please try again.');
      }
    } catch (error) {
      setEmailError('There was an error registering!');
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-container">
          {usernameError && <div className="error-message">{usernameError}</div>}
          <input
            type="text"
            value={username}
            onChange={(e) => { 
              setUsername(e.target.value); 
              setUsernameTouched(true); 
            }}
            placeholder="Username"
            className="login-input"
          />
        </div>
        <div className="input-container">
          {emailError && <div className="error-message">{emailError}</div>}
          <input
            type="email"
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
        <button type="submit" className="login-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
