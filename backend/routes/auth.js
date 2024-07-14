const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db');

const router = express.Router();
const secret = 'mysecretkey';

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  var user = null
  try {
    user = await User.findOne({ where: { username } });
  } catch {}
  
  if (user){
    res.status(400).json({ message: 'User already exists' });
    return;
  } else {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'User creation failed', error });
    }
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
});

router.post('/token', async (req, res) => {
  const {token} = req.body;
  try{
    const result = jwt.verify(token, secret)
    if (Date.now() > result.exp * 1000) {
      res.status(400).json({ message: 'Invalid token' });
    } else {
      res.status(200).json({ message: 'Login successful' });
    }
  }
  catch (error) {
    res.status(400).json({ message: 'Invalid token', error });
  }
})

module.exports = router;
