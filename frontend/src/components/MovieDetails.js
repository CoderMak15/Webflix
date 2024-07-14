import React from 'react';
import "./MovieDetails.css"

const MovieDetails = ({ movie, addToBasket }) => (
  <div className="movie-details">
    <h3 className='title-secondary'>{movie.name}</h3>
    <img src={movie.thumbnail} alt={`${movie.name} thumbnail`}/>
    <p className='title-secondary'>{movie.price}</p>
    <button className="functionnality" onClick={() => addToBasket(movie)}>
          <img className="icon-size" src="./icons/add.png" alt="login" />
        </button>
  </div>
);

export default MovieDetails;
