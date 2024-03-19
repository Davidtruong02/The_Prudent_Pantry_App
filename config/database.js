// const { Sequelize } = require('sequelize');

// // Parse the JawsDB URL
// const jawsdbUrl = 'mysql://t1cwfdwa5qkceyr8:lz7hgpp1im6i0oxu@wp433upk59nnhpoh.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/uixvd8zs165ibe3x';
// const { hostname, port, username, password, pathname } = new URL(jawsdbUrl);
// const databaseName = pathname.substring(1); // Remove leading '/'

// // Create a Sequelize instance with the parsed connection details
// const sequelize = new Sequelize(databaseName, username, password, {
//   host: hostname,
//   port: port,
//   dialect: 'mysql'
// });

// // Test the connection
// async function testConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection to the database has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// testConnection();

// module.exports = sequelize;

// config/database.js

const { Sequelize } = require('sequelize');
const config = require('./config.json');

const { database, username, password, host, dialect } = config.development; // Assuming you're using the 'development' environment configuration

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect
});

module.exports = sequelize;