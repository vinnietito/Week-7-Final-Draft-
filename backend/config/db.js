const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to execute queries
const query = async (sql, params) => {
  const [results] = await pool.execute(sql, params);
  return results;
};

// Export the query function for use in models
module.exports = {
  query,
};

module.exports = pool;