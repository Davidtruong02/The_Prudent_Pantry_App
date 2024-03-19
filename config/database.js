const { Sequelize } = require('sequelize');
const config = require('./config.json');

const { database, username, password, host, dialect } = config.development; // Assuming you're using the 'development' environment configuration

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect
});

module.exports = sequelize;