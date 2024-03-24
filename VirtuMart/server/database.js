import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const connection = mysql
  .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
  })
  .promise(); //allows use of async/await

connection.connect(function (err) {
  if (err) {
    console.error("Error connecting:" + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// connection.query(sqlString, values, callback);
// connection.query('SELECT * FROM users WHERE id = ?', [userId], function (error, results, fields) {
//   if (error) throw error;
//   ...
// });

connection.end();
