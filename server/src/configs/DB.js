require('dotenv').config();

const mysql = require('mysql');

const createConnection = () => {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // debug: true, // Enable debug mode for logging
  });
};

module.exports = {
  getConnection: createConnection,
};
