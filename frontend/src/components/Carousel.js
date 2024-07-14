import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MovieDetails from './MovieDetails';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import "./Carousel.css";
import { AppContext } from '../AppContext';

const Carousel = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { loggedIn, basketItems, setBasketItems} = useContext(AppContext);
  const navigate = useNavigate();

  const addToBasket = (item) => {
    setBasketItems([...basketItems, item]);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get('http://localhost:5000/api/movies');
      setMovies(response.data);
    };
    fetchMovies();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
  };

  return (
  <div>
    <Header/>
    { loggedIn ? (    
      <div className="carousel">
        <button className="functionnality" onClick={() => handlePrev()}>
          <img className="icon-size" src="./icons/prev.png" alt="login" />
        </button>
      {movies.length > 0 && 
        <MovieDetails 
          movie={movies[currentIndex]} 
          addToBasket={addToBasket} 
          />}
        <button className="functionnality" onClick={() => handleNext()}>
          <img className="icon-size" src="./icons/next.png" alt="login" />
        </button>
    </div>
    ) : (
      navigate("../login")
    )
        }
  </div>)
};

export default Carousel;
