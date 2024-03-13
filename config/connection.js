//  Purpose: This file is used to connect to the database using Sequelize.
require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        define: {
            timestamps: false // Disable timestamps by default
        }
    }
);

module.exports = sequelize;
