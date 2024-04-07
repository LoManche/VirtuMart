// Desc: This file contains all the queries that are used to interact with the database
//       Each function must release the connection for better performance.
// The following codes are written with the aid of GitHub Copilot

import mysql from "mysql2/promise";
import MySQLStore from "express-mysql-session";

import { pool } from './db.js';

// One function to handle all the queries
async function queryHandler(query, params, errorStatusCode, res) {
  let connection
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(query, params);
    return rows;
  } catch (error) {
    res.status(errorStatusCode).type("text/plain").send(error);
  } finally {
    if (connection) connection.release();
  }
}
// Login related functions
export const handleLogin = async (req, res) => {
  const {email: emailFetch, password: passwordFetch, rememberMe} = req.body;
  try {
    // Check if the user has logged in or not
    if (req.session.role && req.session.userid) {
      res.status(200).json({ 'role': req.session.role, 'userid': req.session.userid});
      return;
    }
    const adminquery = 'SELECT * FROM admin WHERE adminname = ?';
    const customerquery = 'SELECT * FROM customers WHERE email = ?';
    const admin = await queryHandler(adminquery, [emailFetch], 403, res);
    const customer = await queryHandler(customerquery, [emailFetch], 403, res);
    if (admin.length === 0 && customer.length === 0) {
      res.status(404).type("text/plain").send("No User Exist");
      return;
    }
    if (admin.length !== 0) {
      if (admin[0].password === passwordFetch) {
        req.session.userid = admin[0].admin_id;
        req.session.role = 'admin';
        res.status(200).json({ 'role': 'admin', 'userid': admin[0].admin_id});
      } else {
        res.status(401).type("text/plain").send("Wrong Password");
      }
    } else if (customer.length !== 0) {
      if (customer[0].password === passwordFetch) {
        req.session.userid = customer[0].customer_id;
        req.session.role = 'customer';
        if (rememberMe) {
          req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
        }
        res.status(200).json({ 'role': 'customer', 'userid': customer[0].customer_id});
      } else {
        res.status(401).type("text/plain").send("Wrong Password");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).type("text/plain").send("Server Error");
  }
}


export const handleLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).type("text/plain").send("Server Error");
    }
    else {
      res.status(200).type("text/plain").send("Logged Out");
    }
  });
}

export const signUp = async (req, res) => {

} 

export const signUpOTP = async (req, res) => {
  
}

// Customer functions
export const getAllProducts = async (req, res) => {
  const query = 'SELECT * FROM products';
  const rows = await queryHandler(query, [], 403, res);
  res.status(200).json(rows);
}

export const getProductById = async (req, res) => {
  const query1 = 'SELECT * FROM products WHERE asin = ?';
  const product = await queryHandler(query1, [req.params.id], 403, res);
  const query2 = 'SELECT rating,review,dateOfReview,username FROM reviews INNER JOIN customers ON customers.customer_id = reviews.customer_id';
  const reviews = await queryHandler(query2, [], 403, res);
  res.status(200).json({product, reviews});
}

// TODO: Test searchProducts
export const searchProducts = async (req, res) => {
  const title = req.body.title || '%';
  let category = req.body.category || '%';
  const minPrice = req.body.minPrice || 0;
  const maxPrice = req.body.maxPrice || 1000000;
  const stock = req.body.stock || 0;
  if (category !== '%') {
    const query1 = 'SELECT category_id FROM categories WHERE category_name like ?';
    const rows = await queryHandler(query1, [req.body.category + "%"], 403, res);
    category = rows[0].category_id;
  }
  const query2 = 'SELECT * FROM products WHERE title like ? AND category_id = ? AND price >= ? AND price <= ? AND stock >= ?';
  const rows = await queryHandler(query2, [title, category, minPrice, maxPrice, stock], 403, res);
  res.status(200).json(rows);
}

// TODO: Test addReview
export const addReview = async (req, res) => {
  const query = 'INSERT INTO reviews (customer_id, product_id, rating, review) VALUES (?, ?, ?, ?)';
  const review = req.body.review || '';
  const params = [req.body.customer_id, req.body.product_id, req.body.rating, review];
  await queryHandler(query, params, 404, res);
  res.status(201).type("text/plain").send('Success');
}

export const getCart = async (req, res) => {
  const query = 'SELECT * FROM shopping_cart WHERE customer_id = ?';
  const rows = await queryHandler(query, [req.body.customer_id], 403, res);
  res.status(200).json(rows);
}

export const addToCart = async (req, res) => {
  const c_id = req.body.customer_id;
  const p_id = req.body.product_id;
  const qty = req.body.quantity;
  
  const query = 'INSERT INTO shopping_cart (customer_id, product_id, quantity) VALUES (?, ?, ?)';
  await queryHandler(query, [c_id, p_id, qty], 404, res);
  res.status(201).type("text/plain").send('Success');
}

export const removeFromCart = async (req, res) => {
  const c_id = req.body.customer_id;
  const p_id = req.body.product_id;

  const query = 'DELETE FROM shopping_cart WHERE customer_id = ? AND product_id = ?';
  await queryHandler(query, [c_id, p_id], 404, res);
  res.status(200).type("text/plain").send('Success');
}

export const updateCart = async (req, res) => {
  const c_id = req.body.customer_id;
  const p_id = req.body.product_id;
  const qty = req.body.quantity;

  const query = 'UPDATE shopping_cart SET quantity = ? WHERE customer_id = ? AND product_id = ?';
  await queryHandler(query, [qty, c_id, p_id], 404, res);
  res.status(200).type("text/plain").send('Success');
} 

export const getAllOrder = async (req, res) => {

}

// TODO: remains to join the tables
export const getOrderById = async (req, res) => {
  
  let connection
  try {
    connection = await pool.getConnection();
    const o_id = req.params.id;
    const c_id = req.session.customer_id;
    const [rows, fields] = await connection.query('SELECT * FROM orders WHERE order_id = ?', [o_id]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(404).type("text/plain").send(error); 
  } finally {
    if (connection) connection.release();
  }
}

// TODO: Implementation of this function
export const placeOrder = async (req, res) => {

}


// Admin functions
// TODO: Test all the admin functions
export const addProduct = async (req, res) => {
  const {asin, title, imgURL, rating, price, discount, category_id, description, stock} = req.body;
  const query = 'INSERT INTO products (asin, title, imgURL, rating, price, discount, category_id, description, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const params = [asin, title, imgURL, rating, price, discount, category_id, description, stock];
  await queryHandler(query, params, 403, res);
  res.status(201).type("text/plain").send('Success');
}
export const updateProduct = async (req, res) => {
  const {asin, title, imgURL, rating, price, discount, category_id, description, stock} = req.body;
  const query = 'UPDATE products SET title = ?, imgURL = ?, rating = ?, price = ?, discount = ?, category_id = ?, description = ?, stock = ? WHERE asin = ?';
  const params = [title, imgURL, rating, price, discount, category_id, description, stock, asin];
  await queryHandler(query, params, 403, res);
  res.status(200).type("text/plain").send('Success');
}
export const deleteProduct = async (req, res) => {
  const asin = req.body.asin;
  const query = 'DELETE FROM products WHERE asin = ?';
  await queryHandler(query, [asin], 403, res);
  res.status(200).type("text/plain").send('Success');
}

export const getAllCustomers = async (req, res) => {
  const query = 'SELECT * FROM customers';
  const rows = await queryHandler(query, [], 404, res);
  res.status(200).json(rows);
}
export const getCustomerById = async (req, res) => {
  const query = 'SELECT * FROM customers WHERE customer_id = ?';
  const rows = await queryHandler(query, [req.body.customer_id], 403, res);
  res.status(200).json(rows);
}
export const updateCustomer = async (req, res) => {
  const {customer_id, username, firstName, lastName, phone, city, state, password, email} = req.body;
  const query = 'UPDATE customers SET username = ?, firstName = ?, lastName = ?, phone = ?, city = ?, state = ?, password = ?, email = ? WHERE customer_id = ?';
  const params = [username, firstName, lastName, phone, city, state, password, email, customer_id];
  await queryHandler(query, params, 403, res);
  res.status(200).type("text/plain").send('Success');
}
export const deleteCustomer = async (req, res) => {
  const c_id = req.body.customer_id;
  const query = 'DELETE FROM customers WHERE customer_id = ?';
  await queryHandler(query, [c_id], 403, res);
  res.status(200).type("text/plain").send('Success');
}

export const getAllCategories = async (req, res) => {
  const query = 'SELECT * FROM categories';
  const rows = await queryHandler(query, [], 403, res);
  res.status(200).json(rows);
}
export const addCategory = async (req, res) => {
  const c_id = req.body.category_id;
  const category = req.body.category_name;
  const query = 'INSERT INTO categories (category_name) VALUES (?)';
  await queryHandler(query, [category], 403, res);
  res.status(201).type("text/plain").send('Success');
}
export const updateCategory = async (req, res) => {
  const c_id = req.body.category_id;
  const category = req.body.category_name;
  const query = 'UPDATE categories SET category_name = ? WHERE category_id = ?';
  await queryHandler(query, [category, c_id], 403, res);
  res.status(200).type("text/plain").send('Success');
}
export const deleteCategory = async (req, res) => {
  const c_id = req.body.category_id;
  const query = 'DELETE FROM categories WHERE category_id = ?';
  await queryHandler(query, [c_id], 403, res);
  res.status(200).type("text/plain").send('Success');
}