import React from 'react';
import "./MovieDetails.css"

const MovieDetails = ({ movie, addToBasket }) => (
  <div className="movie-details">
    <h3>{movie.name}</h3>
    <img src={movie.thumbnail} alt={`${movie.name} thumbnail`} />
    <p>{movie.description}</p>
    <p>{movie.price}</p>
    <button onClick={() => addToBasket(movie)}>Buy</button>
  </div>
);

export default MovieDetails;
