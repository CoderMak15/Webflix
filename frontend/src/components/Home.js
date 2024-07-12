import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"

const Home = () => {
    const appStyle = {
        backgroundImage: `url(${"https://my-angers.info/wp-content/uploads/2022/07/netflix-logo.webp"})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      };

    return ( 
        <div className="home" style={appStyle}>
            <h1>Welcome to Movie Rental</h1>
            <div className="image-box">
                <img src="/path/to/image1.jpg" alt="Image 1" />
                <img src="/path/to/image2.jpg" alt="Image 2" />
            </div>
            <div className="auth-buttons">
                <Link to="/signup"><button>Signup</button></Link>
                <Link to="/login"><button>Login</button></Link>
            </div>
        </div>
    );
};

export default Home;
