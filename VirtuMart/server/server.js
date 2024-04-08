//import React from "react";
//import { renderToString } from "react-dom/server";
//import { StaticRouter } from "react-router-dom/server";
import express from "express";
import session from "express-session";
import cors from "cors";
import process from "process";

import * as queries from "./queries.js";
import { sessionStore } from './db.js';

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
  rolling: true,
  store : sessionStore,
  cookie: {
    maxAge: 15 * 60 * 1000, // 15 minutes inactivation 
    // secure: true,
    httpOnly: true
  }
}));

// Middleware to check if the user is authenticated
function isAdminAuthenticated(req, res, next) {
  if (req.session.role === "admin" && req.session.userid) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

function isCustomerAuthenticated(req, res, next) {
  if (req.session.role === "customer" && req.session.userid) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}
// Serve the app in dist(created by npm run build)
app.use(express.static('dist'));

// Login related APIs
app.post('/login', queries.handleLogin);
app.post('/logout', queries.handleLogout);
app.post('/signup', queries.signUp);
app.post('/signup/otp', queries.signUpOTP);
app.post('/signup/setup', queries.signUpSetup);
app.post('/forgotpassword', queries.forgotPassword);
app.post('/resetpassword', queries.resetPassword);

// Product related APIs
app.get('/product', queries.getAllProducts);
app.get('/product/:id', queries.getProductById);
app.post('/search', queries.searchProducts);

// Shopping cart related APIs
app.get('/cart', queries.getCart);
app.post('/cart/add', queries.addToCart);
app.delete('/cart/remove', queries.removeFromCart);
app.post('/cart/update', queries.updateCart);

// Review related APIs
app.put('/review/add', isCustomerAuthenticated, queries.addReview);



// Order related APIs
app.post('/placeorder', queries.placeOrder);
app.get('/order', queries.getAllOrder);
app.get('/order/:id', queries.getOrderById);

// Admin related APIs
app.use('/admin', isAdminAuthenticated);

app.post('/admin/product/add', queries.addProduct);
app.put('/admin/product/update', queries.updateProduct);
app.delete('/admin/product/delete', queries.deleteProduct);

app.get('/admin/customer', queries.getAllCustomers);
app.get('/admin/customerById', queries.getCustomerById);
app.put('/admin/customer/update', queries.updateCustomer);
app.delete('/admin/customer/delete', queries.deleteCustomer);

app.get('/admin/category', queries.getAllCategories);
app.post('/admin/category/add', queries.addCategory);
app.put('/admin/category/update', queries.updateCategory);
app.delete('/admin/category/delete', queries.deleteCategory);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


