const express = require('express');
const { Movie } = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movies', error });
  }
});

module.exports = router;
