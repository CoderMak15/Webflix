import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import "./Home.css"
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';

const Home = () => {
    const { setLoggedIn } = useContext(AppContext)
    const navigate = useNavigate();
    const tryRefreshLoginSession = async () => {
        try {
          const token = localStorage.getItem('token')
          await axios.post('http://localhost:5000/api/auth/token', { token });  
          setLoggedIn(true)
        } catch (error){
          localStorage.setItem('token', null);
        } 
      }
    
      useEffect(() => {
        tryRefreshLoginSession();
      }, []);

    return ( 
        <div className="home">
                <Header/>
            <h1 className='title'>Limited movies, TV shows, and more</h1>
            <h2 className='title sub'>
                Watch everywhere you have access to DVD player. 
                <br/>
                Never receive refund.
            </h2>
            <h2 className='title desc'>Ready to pay? Start by creating an account.</h2>
            <button className='register' onClick={() => navigate('./signup')}>
                <img className='icon' src="icons/register.png" alt='register'/>
            </button>

        </div>
    );

};

export default Home;
