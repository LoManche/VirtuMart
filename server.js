import path from "path";
import fs from "fs";

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();
const session = require('express-session');



app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'VirtuMartDb'
});
 
connection.connect(function (err){
  if (err){
    console.error('Error connecting:' + err.stack)
    return;
  }
  console.log('connected as id ' + connection.threadId);
});
 
// connection.query(sqlString, values, callback);
// connection.query('SELECT * FROM users WHERE id = ?', [userId], function (error, results, fields) {
//   if (error) throw error;
//   ...
// });

connection.end();

