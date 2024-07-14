import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import './Login.css';
import Header from './Header';


const Signup = () => {
  const { setLoggedIn } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (username === null || username.trim() === '') {
      setError('Username cannot be empty');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (confirmPassword === null || password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/signup', { username, password });
      alert('Signup successful');
      setLoggedIn(true);
      navigate('/showroom');
    } catch (error) {
      if (error.response.status === 400){
        setError('Signup failed: ' + 'User already exists');
      } else if (error.response.status === 500){
        setError('Signup failed: ' + 'Internal error');
      } else {
        setError('Signup failed');
      }

    }
  };

  return (
<div>
      <Header />
      <form onSubmit={handleSignup}>
        <h2 className='title-secondary'>Signup</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type='submit' className="functionnality" onClick={() => navigate("/signup")}>
          <img className="icon-size" src="icons/signup.png" alt="signup"/>
        </button>
      </form>
    </div>
  );
};

export default Signup;
