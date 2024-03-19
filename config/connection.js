const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;




// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize({
//   dialect: 'mysql',
//   host: 'wp433upk59nnhpoh.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//   port: 3306,
//   database: 'uixvd8zs165ibe3x',
//   username: 't1cwfdwa5qkceyr8',
//   password: 'lz7hgpp1im6i0oxu',
// });

// module.exports = sequelize;