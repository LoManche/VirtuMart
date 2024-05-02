// Programmer: Lo Yat Fung 1155158670, Lai Cheuk Lam 1155159309
// Date: 2024-04-11
// Purpose: Initialize the database connection, session store, email transporter and root URL for the server, and exporting them 
// Called By: server.js and queries.js
import mysql from "mysql2/promise";
import session from 'express-session';
import MySQLStoreModule from "express-mysql-session";
import nodemailer from "nodemailer";

const MySQLStore = MySQLStoreModule(session);

const options = {
  host     : '127.0.0.2',
  user     : 'Mart',
  port     : 3306,
  password : 'Mart1234',
  database : 'virtumartdb'
}

const transporter = nodemailer.createTransport(
  {
  service: 'gmail',
  auth: {
    user: 'virtumartsignup@gmail.com',
    pass: 'hvpc dutf sgpc hlrn'
  }
  },
  {
    from: 'virtumartsignup@gmail.com',
  }
);

const rootURL = "http://localhost:3000";
const pool = mysql.createPool(options);
const sessionStore = new MySQLStore({}, pool);

export { pool, sessionStore, transporter, rootURL};