const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('ecommerce', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = require('./models/user')(sequelize);
const Movie = require('./models/movie')(sequelize);

sequelize.sync({force: true})
  .then(async () => {
    console.log('Database & tables checked!');
    
    const exampleMovies = [
      {
        name: 'Jaws',
        price: 19.99,
        thumbnail: '/movies/jaws.png',
        id: 1
      },
      {
        name: 'Indiana Jones',
        price: 19.99,
        thumbnail: '/movies/IndianaJones.png',
        id: 2
      },
      {
        name: 'Lord of the Ring',
        price: 19.99,
        thumbnail: '/movies/LOTR.jpg',
        id: 3
      },
      {
        name: 'Star Wars',
        price: 19.99,
        thumbnail: '/movies/starwars.jpg',
        id: 4
      }
    ];

    const exampleUsers = [
      {
        username: 'maxence',
        password: '$2b$10$sXuOjhQLtW5iDOebEFQyWuc/wXSeCP7mx.Rkcea3IaJG3y8vESQJu'
      }
    ]

    for (const user of exampleUsers){
      const existingItem = await User.findOne({ where: { username: user.username } });
      if (!existingItem) {
        await User.create(user);
        console.log(`Added: ${user.username}`);
      } else {
        console.log(`Item already exists: ${user.username}`);
      }
    }

    for (const movie of exampleMovies) {
      const existingItem = await Movie.findOne({ where: { name: movie.name } });
      if (!existingItem) {
        await Movie.create(movie);
        console.log(`Added: ${movie.name}`);
      } else {
        console.log(`Item already exists: ${movie.name}`);
      }
    }
  })
  .catch(err => {
    console.error('Error checking the database:', err);
  });

module.exports = { sequelize, User, Movie };
