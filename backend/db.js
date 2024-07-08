const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync()
  .then(async () => {
    console.log('Database & tables checked!');

    const exampleItems = [
      {
        name: 'Jaws',
        price: 19.99,
        thumbnail: './public/movies/jaws.png',
      },
      {
        name: 'Indiana Jones',
        price: 19.99,
        thumbnail: './public/movies/IndianaJones.png',
      },
      {
        name: 'Lord of the Ring',
        price: 19.99,
        thumbnail: './public/movies/LOTR.png',
      },
      {
        name: 'Star Wars',
        price: 19.99,
        thumbnail: './public/movies/starwars.png',
      }
    ];

    for (const item of exampleItems) {
      const existingItem = await Item.findOne({ where: { name: item.name } });
      if (!existingItem) {
        await Item.create(item);
        console.log(`Added: ${item.name}`);
      } else {
        console.log(`Item already exists: ${item.name}`);
      }
    }
  })
  .catch(err => {
    console.error('Error checking the database:', err);
  });

module.exports = { sequelize, Item };
