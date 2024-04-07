// db.js
import mysql from "mysql2/promise";
import session from 'express-session';
import MySQLStoreModule from "express-mysql-session";

const MySQLStore = MySQLStoreModule(session);

const options = {
  host     : '127.0.0.2',
  user     : 'Mart',
  port     : 3306,
  password : 'Mart1234',
  database : 'virtumartdb'
}

const pool = mysql.createPool(options);
const sessionStore = new MySQLStore({}, pool);

export { pool, sessionStore };