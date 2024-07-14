import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import Header from './Header';

const Login = () => {
  const { setLoggedIn } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setLoggedIn(true)
      navigate('../showroom')
    } catch (error) {
      setError('Invalid Credentials');
    }
  };

  const tryRefreshLoginSession = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token != null){
        await axios.post('http://localhost:5000/api/auth/token', { token });  
        setLoggedIn(true);
      }
    } catch (error){
      localStorage.setItem('token', null);
    } 
  }

  useEffect(() => {
    tryRefreshLoginSession();
  }, []);

  return (
    <div>
      <Header/>
      <form onSubmit={handleLogin}>
        <h2 className='title-secondary'>Login</h2>
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
        <button type='submit' className="functionnality" onClick={() => navigate("/login")}>
          <img className="icon-size" src="./icons/login.png" alt="login" />
        </button>
      </form>
    </div>

  );
};

export default Login;
