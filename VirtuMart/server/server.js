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
 
// Login related APIs
app.post('/login', async (req, res) => {
  const {email, password, rememberMe} = req.body;
  try {
    // Check if the user has logged in or not
    connection = await pool.getConnection();
    if (req.session.password && req.session.email) {
      let [rows, fields] = await connection.query('SELECT * FROM customers WHERE email = ? AND password = ?', [req.session.email, req.session.password]);
      if (rows){
        res.status(200).json({ 'role': 'customer', 'customer_id': rows[0].customer_id});
      }
      [rows, fields] = await connection.query('SELECT * FROM admin WHERE adminname = ? AND password = ?', [req.session.email, req.session.password]);
      if (rows){
        res.status(200).json({ 'role': 'admin', 'admin_id': rows[0].admin_id});
      }
    }
    // Check if the user is a customer
    let [rows, fields] = await connection.query('SELECT * FROM customers WHERE email = ?', [email]);
    if (rows && rows[0].password === password) {
      req.session.user = rows[0].customer_id;
      req.session.email = email;
      req.session.password = password;
      if (rememberMe) {
        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7; //7 days
      }
      res.status(200).json({ 'role': 'customer', 'customer_id': rows[0].customer_id});
    }
    else if (rows && rows[0].password !== password) { // Check if the password is wrong
      res.status(401).send("Wrong Password");
    }
    // Check if the user is an admin
    [rows, fields] = await connection.query('SELECT * FROM admin WHERE adminname = ? AND password = ?', [email, password]);
    if (rows && rows[0].password === password) {
      req.session.user = rows[0].admin_id;
      req.session.email = email;
      req.session.password = password;
      res.status(200).json({ 'role': 'admin', 'admin_id': rows[0].admin_id});
    }
    else if (rows && rows[0].password !== password) { // Check if the password is wrong
      res.status(401).send("Wrong Password");
    }
    // If the user is not found
    res.status(404).send("No User Exist");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  } finally {
    if (connection) connection.release();
  }
}
);
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


