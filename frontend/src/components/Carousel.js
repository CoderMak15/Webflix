import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MovieDetails from './MovieDetails';
import BasketPopup from './BasketPopup';
import "./Carousel.css"

const Carousel = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [basketItems, setBasketItems] = useState([]);
  const [cartVisibility, setCartVisiblity] = useState(false);

  const addToBasket = (item) => {
    setBasketItems([...basketItems, item]);
  };

  const removeFromBasket = (index) => {
    setBasketItems(basketItems.filter((_, i) => i !== index));
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
    <header style={{ position: 'fixed', top: 0, right: 0, padding: '10px' }}>
      <button onClick={() => setCartVisiblity(true)} style={{ position: 'relative', background: 'none', border: 'none' }}>
        <FontAwesomeIcon icon={faShoppingCart} size="2x" />
        <span style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          background: 'red',
          color: 'white',
          borderRadius: '50%',
          padding: '5px',
          fontSize: '12px'
        }}>
          {basketItems.length}
        </span>
      </button>
    </header>

    <div className="carousel">
      <button onClick={handlePrev}>Prev</button>
      {movies.length > 0 && 
        <MovieDetails 
          movie={movies[currentIndex]} 
          addToBasket={addToBasket} 
          />}
      <button onClick={handleNext}>Next</button>
      {
        <BasketPopup 
           trigger = {cartVisibility}
           setTrigger = {setCartVisiblity}
           items = {basketItems} 
           remove = {removeFromBasket} 
         />
       }
    </div>
  </div>

  );
};

export default Carousel;
