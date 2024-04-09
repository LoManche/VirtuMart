// Desc: This file contains all the queries that are used to interact with the database
//       Each function must release the connection for better performance.
// The following codes are written with the aid of GitHub Copilot

import mysql from "mysql2/promise";
import MySQLStore from "express-mysql-session";
import crypto from "crypto";

import { rootURL, pool, transporter } from './db.js';

function hashWithSHA256(data) {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
}

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

//-----------------------------------------------------------------------------------------------
// Login related functions
// TODO: fix the session reminents problem
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
        req.session.regenerate(err => {
          if (err) {
            console.error(err);
            res.status(500).type("text/plain").send("Server Error");
            return;
          }
          req.session.userid = admin[0].admin_id;
          req.session.role = 'admin';
          res.status(200).json({ 'role': 'admin', 'userid': admin[0].admin_id});
        });
      } else {
        res.status(401).type("text/plain").send("Wrong Password");
      }
    } else if (customer.length !== 0) {
      if (customer[0].password === passwordFetch) {
        req.session.regenerate(err => {
          if (err) {
            console.error(err);
            res.status(500).type("text/plain").send("Server Error");
            return;
          }
          req.session.userid = customer[0].customer_id;
          req.session.role = 'customer';
          if (rememberMe) {
            req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
          }
          res.status(200).json({ 'role': 'customer', 'userid': customer[0].customer_id});
        });
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
  const email = req.body.email;
  const OTP = Math.floor(100000 + Math.random() * 900000);
  const query = 'INSERT INTO otp (email, otp) VALUES (?, ?)';
  await queryHandler(query, [email, OTP], 403, res);

  const mailOptions = {
    to: email,
    text: 'Your OTP for VirtuMart Signup is: ' + OTP,
    subject: 'VirtuMart Signup OTP',
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).type("text/plain").send(error);
    } else {
      res.status(200).type("text/plain").send("OTP sent to your email");
    }
  });
} 

export const signUpOTP = async (req, res) => {
  const otp = req.body.otp;
  const email = req.body.email;
  const query = 'SELECT * FROM otp WHERE email = ?';
  const rows = await queryHandler(query, [email], 403, res);
  if (rows.length === 0) {
    res.status(404).type("text/plain").send("No OTP found for this email");
    return
  }
  if (rows[0].otp !== otp) {
    const deleteotp = 'DELETE FROM otp WHERE email = ?';
    await queryHandler(deleteotp, [email], 403, res);
    res.status(401).type("text/plain").send("Wrong OTP");
    return;
  }
  else {
    const deleteotp = 'DELETE FROM otp WHERE email = ?';
    await queryHandler(deleteotp, [email], 403, res);
    res.status(200).type("text/plain").send("OTP Matched");
  }

}

export const forgotPassword = async (req, res) => {
  const email = req.body.email;
  // Delete the previous forgetpw entry if exists
  const deleteQuery = 'DELETE FROM forgetpw WHERE email = ?';
  await queryHandler(deleteQuery, [email], 403, res);  
  const userQuery = 'SELECT * FROM customers WHERE email = ?';
  const rows = await queryHandler(userQuery, [email], 403, res);
  if (rows.length === 0) {
    res.status(404).type("text/plain").send("No User Found");
    return;
  }
  const OTP = Math.floor(100000 + Math.random() * 900000);
  const hashed = hashWithSHA256(email+OTP);
  const query = 'INSERT INTO forgetpw (email, hashed) VALUES (?, ?)';
  await queryHandler(query, [email, hashed], 403, res);
  const link = rootURL + '/resetpassword?hashed=' + hashed;
  const mailOptions = {
    to: email,
    text: 'Your link for VirtuMart Password Reset is: ' + link,
    subject: 'VirtuMart Password Reset',
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).type("text/plain").send(error);
    } else {
      res.status(200).type("text/plain").send("Reset link is sent to your email");
    }
  });
}
export const resetPassword = async (req, res) => {
  const hashed = req.query.hashed;
  const query = 'SELECT * FROM forgetpw WHERE hashed = ?';
  const rows = await queryHandler(query, [hashed], 403, res);
  if (rows.length === 0) {
    res.status(404).type("text/plain").send("Invalid");
    return;
  }
  const email = rows[0].email;
  const newpassword = req.body.newpassword;
  const updateQuery = 'UPDATE customers SET password = ? WHERE email = ?';
  await queryHandler(updateQuery, [newpassword, email], 403, res);
  const deleteQuery = 'DELETE FROM forgetpw WHERE hashed = ?';
  await queryHandler(deleteQuery, [hashed], 403, res);  
  res.status(200).type("text/plain").send("Password Reset Successful");
}

export const signUpSetup = async (req, res) => {
  const {customer_id, username, firstName, lastName, phone, city, state, password, email} = req.body;
  const query = 'INSERT INTO customers (username, firstName, lastName, phone, city, state, password, email, customer_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const params = [username, firstName, lastName, phone, city, state, password, email, customer_id];
  await queryHandler(query, params, 403, res);
  res.status(200).type("text/plain").send('Success');
}
//-----------------------------------------------------------------------------------------------
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
// Cart functions
export const getCart = async (req, res) => {
  const query = 'SELECT product_id, quantity FROM shopping_cart INNER JOIN customers ON shopping_cart.customer_id = customers.customer_id WHERE shopping_cart.customer_id = ?';
  const rows = await queryHandler(query, [req.body.customer_id], 403, res);
  res.status(200).json(rows);
}

export const addToCart = async (req, res) => {
  const {customer_id, product_id, quantity} = req.body;
  const query = 'INSERT INTO shopping_cart (customer_id, product_id, quantity) VALUES (?, ?, ?)';
  await queryHandler(query, [customer_id, product_id, quantity], 404, res);
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

// TODO: Test addReview
export const addReview = async (req, res) => {
  const query = 'INSERT INTO reviews (customer_id, product_id, rating, review) VALUES (?, ?, ?, ?)';
  const review = req.body.review || '';
  const params = [req.body.customer_id, req.body.product_id, req.body.rating, review];
  await queryHandler(query, params, 404, res);
  // Update the rating of the product
  const query2 = 'SELECT AVG(rating) FROM reviews WHERE product_id = ?';
  const rows = await queryHandler(query2, [req.body.product_id], 404, res);
  const rating = rows[0]['AVG(rating)'];
  const query3 = 'UPDATE products SET rating = ? WHERE asin = ?';
  res.status(201).type("text/plain").send('Success');
}

export const getAllOrder = async (req, res) => {
  const {customer_id} = req.body;
  const query = 'SELECT order_id, subtotal, shippingcost, orderstatus, dateoforder FROM martorder WHERE customer_id = ?';
  const rows = await queryHandler(query, [customer_id], 404, res);
  res.status(200).json(rows);
}

export const getOrderById = async (req, res) => {
  const {customer_id, order_id} = req.body;
  const orderquery = 'SELECT * FROM martorder WHERE customer_id = ? AND order_id = ?';
  const orderrows = await queryHandler(orderquery, [customer_id, order_id], 404, res);
  const productquery = 'SELECT * FROM martorder_products WHERE order_id = ?';
  const productrows = await queryHandler(productquery, [order_id], 404, res);
  res.status(200).json({orderrows, productrows});
}

// TODO: Testing this function
export const placeOrder = async (req, res) => {
  const {customer_id, subtotal, shippingcost, flat, address, city, country, postalCode, paymentMethod, products} = req.body;
  const orderstatus = 'Ordered';
  let connection
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const orderquery = 'INSERT INTO martorder (customer_id, subtotal, shippingcost, flat, address, city, country, postalCode, paymentMethod) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const orderparams = [customer_id, subtotal, shippingcost, flat, address, city, country, postalCode, paymentMethod];
    await connection.execute(orderquery, orderparams);
    const orderid = await connection.query('SELECT LAST_INSERT_ID()');
    const order_id = orderid[0]['LAST_INSERT_ID()'];
    for (let product of products) {
      let productquery = 'INSERT INTO martorder_products (order_id, product_id, quantity) VALUES (?, ?, ?)';
      let productparams = [order_id, product.product_id, product.quantity];
      await connection.execute(productquery, productparams);
    }
    await connection.commit();
  } 
  catch (error) {
    await connection.rollback();
    res.status(500).type("text/plain").send(error);
  } finally {
    if (connection) connection.release();
  }
}

//-----------------------------------------------------------------------------------------------
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
export const getAllAdmin = async (req, res) => {
  const query = 'SELECT * FROM admin';
  const rows = await queryHandler(query, [], 404, res);
  res.status(200).json(rows);
}
export const addAdmin = async (req, res) => {
  const adminname = req.body.adminname;
  const password = req.body.password;
  const query = 'INSERT INTO admin (adminname, password) VALUES (?, ?)';
  await queryHandler(query, [adminname, password], 404, res);
  res.status(201).type("text/plain").send('Success');
}
export const updateAdmin = async (req, res) => {
  const adminname = req.body.adminname;
  const password = req.body.password;
  const admin_id = req.body.admin_id;
  const query = 'UPDATE admin SET adminname = ?, password = ? WHERE admin_id = ?';
  await queryHandler(query, [adminname, password, admin_id], 404, res);
  res.status(200).type("text/plain").send('Success');
}
export const deleteAdmin = async (req, res) => {
  const admin_id = req.body.admin_id;
  const query = 'DELETE FROM admin WHERE admin_id = ?';
  await queryHandler(query, [admin_id], 404, res);
  res.status(200).type("text/plain").send('Success');
}
