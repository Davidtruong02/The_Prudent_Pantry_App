const { Sequelize, Model, DataTypes } = require('sequelize');

// Initialize Sequelize with the connection string
const sequelize = new Sequelize('mysql://t1cwfdwa5qkceyr8:lz7hgpp1im6i0oxu@wp433upk59nnhpoh.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/uixvd8zs165ibe3x');

// Define the Session model
const Session = sequelize.define('Session', {
  sid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  expires: DataTypes.DATE,
  data: DataTypes.TEXT
}, {
  tableName: 'Sessions'
});

// Connect to the database
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    // Query the Sessions table for session data
    Session.findOne({ where: { sid: 'ghvXSUQ387iRu4YMRf-_dNcyqjy3Moa_' } })
      .then(session => {
        if (session) {
          console.log('Session data:', session.dataValues.data);
        } else {
          console.log('Session not found.');
        }
      })
      .catch(err => {
        console.error('Error querying session:', err);
      });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
