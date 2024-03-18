//  Purpose: This file is used to connect to the database using Sequelize.
require('dotenv').config();
/* let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    },
  );
} */

/* let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    },
  );
} */

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'wp433upk59nnhpoh.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  port: 3306,
  database: 'uixvd8zs165ibe3x',
  username: 't1cwfdwa5qkceyr8',
  password: 'lz7hgpp1im6i0oxu',
});

module.exports = sequelize;