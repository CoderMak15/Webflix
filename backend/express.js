// server.js
const express = require('express');
const cors = require('cors');
const { sequelize, Item } = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/items', async (req, res) => { 
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/items', async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

sequelize.authenticate().then(() => {
  console.log('Database connected...');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
