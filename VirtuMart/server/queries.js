// Desc: This file contains all the queries that are used to interact with the database
//       Each function must release the connection for better performance.
// The following codes are written with the aid of GitHub Copilot

import mysql from "mysql2/promise";
import MySQLStore from "express-mysql-session";
import crypto from "crypto";

import { rootURL, pool, transporter } from "./db.js";

function hashWithSHA256(data) {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}

// One function to handle all the queries
async function queryHandler(query, params) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(query, params);
    return rows;
  } catch (error) {
    //res.status(errorStatusCode).type("text/plain").send(error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

//-----------------------------------------------------------------------------------------------
// Login related functions
// TODO: fix the session reminents problem
export const handleLogin = async (req, res) => {
  const { email: emailFetch, password: passwordFetch, rememberMe } = req.body;
  try {
    // Check if the user has logged in or not

    if (req.session.role && req.session.userid) {
      res.status(200).json({ role: req.session.role, userid: req.session.userid });
      return;
    }
    const adminquery = "SELECT * FROM admin WHERE adminname = ?";
    const customerquery = "SELECT * FROM customers WHERE email = ?";
    const admin = await queryHandler(adminquery, [emailFetch]);
    const customer = await queryHandler(customerquery, [emailFetch]);
    if (admin.length === 0 && customer.length === 0) {
      res.status(404).type("text/plain").send("No User Exist");
      return;
    }
    if (admin.length !== 0) {
      if (admin[0].password === passwordFetch) {
        req.session.regenerate((err) => {
          if (err) {
            console.error(err);
            res.status(500).type("text/plain").send("Server Error");
            return;
          }
          req.session.userid = admin[0].admin_id;
          req.session.role = "admin";
          res.status(200).json({ role: "admin", userid: admin[0].admin_id });
        });
      } else {
        res.status(401).type("text/plain").send("Wrong Password");
      }
    } else if (customer.length !== 0) {
      if (customer[0].password === passwordFetch) {
        req.session.regenerate((err) => {
          if (err) {
            console.error(err);
            res.status(500).type("text/plain").send("Server Error");
            return;
          }
          req.session.userid = customer[0].customer_id;
          req.session.role = "customer";
          if (rememberMe) {
            req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
          }
          res.status(200).json({ role: "customer", userid: customer[0].customer_id });
        });
      } else {
        res.status(401).type("text/plain").send("Wrong Password");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).type("text/plain").send("Server Error");
  }
};

export const handleLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).type("text/plain").send("Server Error");
    } else {
      res.status(200).type("text/plain").send("Logged Out");
    }
  });
};

export const signUp = async (req, res) => {
  const email = req.body.email;
  const OTP = Math.floor(100000 + Math.random() * 900000);
  try {
    const query = "INSERT INTO otp (email, otp) VALUES (?, ?)";
    await queryHandler(query, [email, OTP]);

    const mailOptions = {
      to: email,
      text: "Your OTP for VirtuMart Signup is: " + OTP,
      subject: "VirtuMart Signup OTP",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).type("text/plain").send(error);
      } else {
        res.status(200).type("text/plain").send("OTP sent to your email");
      }
    });
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};

export const signUpOTP = async (req, res) => {
  try {
    const otp = req.body.otp;
    const email = req.body.email;
    const query = "SELECT * FROM otp WHERE email = ?";

    const rows = await queryHandler(query, [email]);
    if (rows.length === 0) {
      res.status(404).type("text/plain").send("No OTP found for this email");
      return;
    }
    if (rows[0].otp !== otp) {
      const deleteotp = "DELETE FROM otp WHERE email = ?";
      await queryHandler(deleteotp, [email]);
      res.status(401).type("text/plain").send("Wrong OTP");
      return;
    } else {
      const deleteotp = "DELETE FROM otp WHERE email = ?";
      await queryHandler(deleteotp, [email]);
      res.status(200).type("text/plain").send("OTP Matched");
    }
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};

export const forgotPassword = async (req, res) => {
  const email = req.body.email;
  try {
    // Delete the previous forgetpw entry if exists
    const deleteQuery = "DELETE FROM forgetpw WHERE email = ?";
    await queryHandler(deleteQuery, [email]);
    const userQuery = "SELECT * FROM customers WHERE email = ?";
    const rows = await queryHandler(userQuery, [email]);
    if (rows.length === 0) {
      res.status(404).type("text/plain").send("No User Found");
      return;
    }
    const OTP = Math.floor(100000 + Math.random() * 900000);
    const hashed = hashWithSHA256(email + OTP);
    const query = "INSERT INTO forgetpw (email, hashed) VALUES (?, ?)";
    await queryHandler(query, [email, hashed]);
    const link = rootURL + "/resetpassword/hashed/" + hashed;
    const mailOptions = {
      to: email,
      text: "Your link for VirtuMart Password Reset is: " + link,
      subject: "VirtuMart Password Reset",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).type("text/plain").send(error);
      } else {
        res.status(200).type("text/plain").send("Reset link is sent to your email");
      }
    });
  } catch (error) {
    res.status(404).type("text/plain").send(error);
  }
};
export const resetPassword = async (req, res) => {
  try {
    const hashed = req.body.hashed;
    const query = "SELECT * FROM forgetpw WHERE hashed = ?";
    const rows = await queryHandler(query, [hashed]);
    if (rows.length === 0) {
      res.status(404).type("text/plain").send("Invalid");
      return;
    }
    const email = rows[0].email;
    const newpassword = req.body.newpassword;
    const updateQuery = "UPDATE customers SET password = ? WHERE email = ?";
    await queryHandler(updateQuery, [newpassword, email]);
    const deleteQuery = "DELETE FROM forgetpw WHERE hashed = ?";
    await queryHandler(deleteQuery, [hashed]);
    res.status(200).type("text/plain").send("Password Reset Successful");
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};
export const changePassword = async (req, res) => {
  try {
    const { oldpassword, newpassword, customer_id } = req.body;
    const query = "SELECT * FROM customers WHERE customer_id = ? and password = ?";
    const rows = await queryHandler(query, [customer_id, oldpassword]);
    if (rows.length === 0) {
      res.status(401).type("text/plain").send("Wrong Old password");
      return;
    }
    const updateQuery = "UPDATE customers SET password = ? WHERE customer_id = ?";
    await queryHandler(updateQuery, [newpassword, customer_id]);
    res.status(200).type("text/plain").send("Password Changed");
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};

export const signUpSetup = async (req, res) => {
  try {
    const { username, firstName, lastName, phone, address, city, state, password, email } =
      req.body;
    const query =
      "INSERT INTO customers (username, firstName, lastName, phone, address, city, state, password, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const params = [username, firstName, lastName, phone, address, city, state, password, email];
    await queryHandler(query, params);
    res.status(200).type("text/plain").send("Success");
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};
export const getCustomerProfile = async (req, res) => {
  try {
    const query =
      "SELECT customer_id, username, firstName, lastName, phone, address, city, state, email FROM customers WHERE customer_id = ?";
    const rows = await queryHandler(query, [req.body.customer_id]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};

//-----------------------------------------------------------------------------------------------
// Customer functions
export const getRandomProducts = async (req, res) => {
  try {
    const query = "SELECT * FROM products ORDER BY RAND() LIMIT 6";
    const rows = await queryHandler(query, []);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const query =
      "SELECT * FROM products INNER JOIN categories ON products.category_id = categories.category_id";
    const rows = await queryHandler(query, []);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const query1 =
      "SELECT * FROM products INNER JOIN categories ON products.category_id = categories.category_id WHERE asin = ?";
    const product = await queryHandler(query1, [req.params.id]);
    const query2 =
      "SELECT rating,review,dateOfReview,username FROM reviews INNER JOIN customers ON customers.customer_id = reviews.customer_id where product_id = ?";
    const reviews = await queryHandler(query2, [req.params.id]);
    res.status(200).json({ product, reviews });
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};

// TODO: Test searchProducts
export const searchProducts = async (req, res) => {
  try {
    const title = req.body.title || "%";
    let category = req.body.category || "%";
    const minPrice = req.body.minPrice || 0;
    const maxPrice = req.body.maxPrice || 1000000;
    const stock = req.body.stock || 0;
    const query2 =
      "SELECT * FROM products p INNER JOIN categories c on p.category_id=c.category_id WHERE title like ? AND c.category_name like ? AND price >= ? AND price <= ? AND stock >= ?";
    const rows = await queryHandler(query2, [
      "%" + title + "%",
      "%" + category + "%",
      minPrice,
      maxPrice,
      stock,
    ]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};
// Cart functions
export const getCart = async (req, res) => {
  try {
    const query =
      "SELECT product_id, quantity FROM shopping_cart INNER JOIN customers ON shopping_cart.customer_id = customers.customer_id WHERE shopping_cart.customer_id = ?";
    const rows = await queryHandler(query, [req.body.customer_id]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};

export const addToCart = async (req, res) => {
  try {
    const { customer_id, product_id, quantity } = req.body;
    const query = "INSERT INTO shopping_cart (customer_id, product_id, quantity) VALUES (?, ?, ?)";
    await queryHandler(query, [customer_id, product_id, quantity]);
    res.status(201).type("text/plain").send("Success");
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const c_id = req.body.customer_id;
    const p_id = req.body.product_id;
    const query = "DELETE FROM shopping_cart WHERE customer_id = ? AND product_id = ?";
    await queryHandler(query, [c_id, p_id]);
    res.status(200).type("text/plain").send("Success");
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};

export const updateCart = async (req, res) => {
  try {
    const c_id = req.body.customer_id;
    const p_id = req.body.product_id;
    const qty = req.body.quantity;

    const query = "UPDATE shopping_cart SET quantity = ? WHERE customer_id = ? AND product_id = ?";
    await queryHandler(query, [qty, c_id, p_id]);
    res.status(200).type("text/plain").send("Success");
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};

// TODO: Test addReview
export const addReview = async (req, res) => {
  try {
    const query =
      "INSERT INTO reviews (customer_id, product_id, rating, review) VALUES (?, ?, ?, ?)";
    const review = req.body.review || "";
    const params = [req.body.customer_id, req.body.product_id, req.body.rating, review];
    await queryHandler(query, params);
    // Update the rating of the product
    const query2 = "SELECT AVG(rating) FROM reviews WHERE product_id = ?";
    const rows = await queryHandler(query2, [req.body.product_id]);
    const rating = rows[0]["AVG(rating)"];
    const query3 = "UPDATE products SET rating = ? WHERE asin = ?";
    res.status(201).type("text/plain").send("Success");
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};
export const getRecommendation = async (req, res) => {
  const customer_id = req.body.customer_id;
  //let connection;
  try {
    //connection = await pool.getConnection();
    //await connection.beginTransaction();
    const query = `SELECT * FROM products WHERE category_id IN 
    (SELECT p.category_id FROM martorder_products mp 
    INNER JOIN martorder mo ON mp.order_id = mo.order_id 
    INNER JOIN products p ON mp.product_id = p.asin WHERE mo.customer_id = ?) ORDER BY RAND() LIMIT 6 `;
    const rows = await queryHandler(query, [customer_id]);
    //await connection.commit();
    res.status(200).json(rows);
  } catch (error) {
    //connection.rollback();
    res.status(500).type("text/plain").send(error);
  }
};
export const getNotification = async (req, res) => {
  try {
    const customer_id = req.body.customer_id;
    const query = "SELECT * FROM notifications WHERE customer_id = ?";
    const rows = await queryHandler(query, [customer_id]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};
export const getDiscount = async (req, res) => {
  try {
    const query = "SELECT * FROM products WHERE discount > 0 LIMIT 6";
    const rows = await queryHandler(query, []);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const { customer_id } = req.body;
    const query =
      "SELECT order_id, subtotal, shippingcost, orderstatus, dateoforder FROM martorder WHERE customer_id = ?";
    const rows = await queryHandler(query, [customer_id]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { customer_id, order_id } = req.body;
    const orderquery = "SELECT * FROM martorder WHERE customer_id = ? AND order_id = ?";
    const orderrows = await queryHandler(orderquery, [customer_id, order_id]);
    const productquery = "SELECT * FROM martorder_products WHERE order_id = ?";
    const productrows = await queryHandler(productquery, [order_id]);
    res.status(200).json({ orderrows, productrows });
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};

// TODO: Testing this function
export const placeOrder = async (req, res) => {
  const {
    customer_id,
    subtotal,
    shippingcost,
    flat,
    address,
    city,
    country,
    postalCode,
    paymentMethod,
    products,
  } = req.body;
  const orderstatus = "Ordered";
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const orderquery =
      "INSERT INTO martorder (customer_id, subtotal, shippingcost, flat, address, city, country, postalCode, paymentMethod) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const orderparams = [
      customer_id,
      subtotal,
      shippingcost,
      flat,
      address,
      city,
      country,
      postalCode,
      paymentMethod,
    ];
    await connection.execute(orderquery, orderparams);
    const orderid = await connection.query("SELECT LAST_INSERT_ID()");
    const order_id = orderid[0]["LAST_INSERT_ID()"];
    for (let product of products) {
      let productquery =
        "INSERT INTO martorder_products (order_id, product_id, quantity) VALUES (?, ?, ?)";
      let productparams = [order_id, product.product_id, product.quantity];
      await connection.execute(productquery, productparams);
      let stockquery = "UPDATE products SET stock = stock - ? WHERE asin = ?";
      let stockparams = [product.quantity, product.product_id];
      await connection.execute(stockquery, stockparams);
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    res.status(500).type("text/plain").send(error);
  } finally {
    if (connection) connection.release();
  }
};

//-----------------------------------------------------------------------------------------------
// Admin functions
// TODO: Test all the admin functions
export const getAllProductAdmin = async (req, res) => {
  try {
    const query = `SELECT p.asin,p.title,p.imgURL,p.rating,p.price,p.discount, c.category_id, c.category_name, p.description, p.stock, COALESCE(sum(mp.quantity), 0) as sold FROM products p
    LEFT JOIN martorder_products mp ON p.asin = mp.product_id
    INNER JOIN categories c ON c.category_id = p.category_id
    GROUP BY p.asin`;
    const rows = await queryHandler(query, []);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};

export const addProduct = async (req, res) => {
  try {
    const { asin, title, imgURL, rating, price, discount, category_id, description, stock } =
      req.body;
    const query =
      "INSERT INTO products (asin, title, imgURL, rating, price, discount, category_id, description, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const params = [asin, title, imgURL, rating, price, discount, category_id, description, stock];
    await queryHandler(query, params);
    res.status(201).type("text/plain").send("Success");
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { asin, title, imgURL, rating, price, discount, category_id, description, stock } =
      req.body;
    const query =
      "UPDATE products SET title = ?, imgURL = ?, rating = ?, price = ?, discount = ?, category_id = ?, description = ?, stock = ? WHERE asin = ?";
    const params = [title, imgURL, rating, price, discount, category_id, description, stock, asin];
    await queryHandler(query, params);
    res.status(200).type("text/plain").send("Success");
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const asin = req.body.asin;
    const query = "DELETE FROM products WHERE asin = ?";
    await queryHandler(query, [asin]);
    res.status(200).type("text/plain").send("Success");
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const query = "SELECT * FROM customers";
    const rows = await queryHandler(query, []);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};
export const getCustomerById = async (req, res) => {
  try {
    const query = "SELECT * FROM customers WHERE customer_id = ?";
    const rows = await queryHandler(query, [req.body.customer_id]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};
export const updateCustomer = async (req, res) => {
  try {
    const {
      customer_id,
      username,
      firstName,
      lastName,
      phone,
      address,
      city,
      state,
      password,
      email,
    } = req.body;
    const query =
      "UPDATE customers SET username = ?, firstName = ?, lastName = ?, phone = ?, address = ?, city = ?, state = ?, password = ?, email = ? WHERE customer_id = ?";
    const params = [
      username,
      firstName,
      lastName,
      phone,
      address,
      city,
      state,
      password,
      email,
      customer_id,
    ];
    await queryHandler(query, params);
    res.status(200).type("text/plain").send("Success");
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};
export const deleteCustomer = async (req, res) => {
  try {
    const c_id = req.body.customer_id;
    const query = "DELETE FROM customers WHERE customer_id = ?";
    await queryHandler(query, [c_id]);
    res.status(200).type("text/plain").send("Success");
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const query = `SELECT c.category_id, c.category_name, COALESCE(COALESCE(sum(p.stock), 0), 0) as stock, COALESCE(sum(mp.quantity), 0) as sold FROM categories c
    LEFT JOIN products p ON c.category_id = p.category_id
    LEFT JOIN martorder_products mp ON p.asin = mp.product_id
    GROUP BY c.category_id
    `;
    const rows = await queryHandler(query, []);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};
export const addCategory = async (req, res) => {
  try {
    const category = req.body.category_name;
    const query = "INSERT INTO categories (category_name) VALUES (?)";
    await queryHandler(query, [category]);
    res.status(201).type("text/plain").send("Success");
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};
export const updateCategory = async (req, res) => {
  try {
    const c_id = req.body.category_id;
    const category = req.body.category_name;
    const query = "UPDATE categories SET category_name = ? WHERE category_id = ?";
    await queryHandler(query, [category, c_id]);
    res.status(200).type("text/plain").send("Success");
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const c_id = req.body.category_id;
    const query = "DELETE FROM categories WHERE category_id = ?";
    await queryHandler(query, [c_id]);
    res.status(200).type("text/plain").send("Success");
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};

export const getAllAdmin = async (req, res) => {
  try {
    const query = "SELECT * FROM admin";
    const rows = await queryHandler(query, []);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};
export const addAdmin = async (req, res) => {
  try {
    const adminname = req.body.adminname;
    const password = req.body.password;
    const query = "INSERT INTO admin (adminname, password) VALUES (?, ?)";
    await queryHandler(query, [adminname, password]);
    res.status(201).type("text/plain").send("Success");
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};
export const updateAdmin = async (req, res) => {
  try {
    const adminname = req.body.adminname;
    const password = req.body.password;
    const admin_id = req.body.admin_id;
    const query = "UPDATE admin SET adminname = ?, password = ? WHERE admin_id = ?";
    await queryHandler(query, [adminname, password, admin_id]);
    res.status(200).type("text/plain").send("Success");
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};
export const deleteAdmin = async (req, res) => {
  try {
    const admin_id = req.body.admin_id;
    const query = "DELETE FROM admin WHERE admin_id = ?";
    await queryHandler(query, [admin_id]);
    res.status(200).type("text/plain").send("Success");
  } catch (error) {
    res.status(500).type("text/plain").send(error);
  }
};
