import React from "react";
//import { renderToString } from "react-dom/server";
//import { StaticRouter } from "react-router-dom/server";
import express from "express";
import session from "express-session";
import mysql from "mysql2/promise";
import {cors} from "cors";
import dotenv from "dotenv";

import queries from "./queries.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

// serve the app in dist(created by npm run build)
app.use(express.static('dist'));

const pool = mysql.createPool({
  host     : process.env.DB_HOST || '127.0.0.2',
  user     : process.env.DB_USER || 'Mart',
  port     : process.env.DB_PORT || 3306,
  password : process.env.DB_PW || 'Mart1234',
  database : process.env.DB_NAME || 'virtumartdb'
});
const connection = await pool.getConnection();

app.get('/api/products', queries.getAllProducts);

// async function dummyQ(){
//   const [rows, fields] = await connection.query('SELECT * FROM products limit 5');
//   console.log(rows)
// }
// dummyQ();

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


