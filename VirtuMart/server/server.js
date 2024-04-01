import React from "react";
//import { renderToString } from "react-dom/server";
//import { StaticRouter } from "react-router-dom/server";
import express from "express";
import session from "express-session";
import cors from "cors";

import queries from "./queries.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));
app.use(session({
  secret: 'virtumartserverisawesome',
  name: 'sessionId',
  saveUninitialized: false,
  resave: true,
  rolling: true
}));

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}
// Serve the app in dist(created by npm run build)
app.use(express.static('dist'));
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const pool = mysql.createPool({
  host     : process.env.DB_HOST || '127.0.0.2',
  user     : process.env.DB_USER || 'Mart',
  port     : process.env.DB_PORT || 3306,
  password : process.env.DB_PW || 'Mart1234',
  database : process.env.DB_NAME || 'virtumartdb'
});
// Login related APIs
app.post('/login', queries.handleLogin);
// Product related APIs
app.get('/product', queries.getAllProducts);
app.get('/product/:id', queries.getProductById);
app.post('/search', queries.searchProducts);

// Shopping cart related APIs
app.get('/cart', queries.getCart);
app.post('/cart/add', queries.addToCart);
app.post('/cart/remove', queries.removeFromCart);
app.post('/cart/update', queries.updateCart);




app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


