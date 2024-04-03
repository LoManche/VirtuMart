// Desc: This file contains all the queries that are used to interact with the database
//       Each function must release the connection for better performance.
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import process from "process";
dotenv.config();
const pool = mysql.createPool({
  host     : process.env.DB_HOST || '127.0.0.2',
  user     : process.env.DB_USER || 'Mart',
  port     : process.env.DB_PORT || 3306,
  password : process.env.DB_PW || 'Mart1234',
  database : process.env.DB_NAME || 'virtumartdb'
});
// Login related functions
export const handleLogin = async (req, res) => {
  const {email: emailFetch, password: passwordFetch, rememberMe} = req.body;
  let connection 
  try {
    // Check if the user has logged in or not
    connection = await pool.getConnection();
    if (req.session.password && req.session.email) {
      let [rows] = await connection.query('SELECT * FROM customers WHERE email = ? AND password = ?', [req.session.email, req.session.password]);
      if (rows){
        res.status(200).json({ 'role': 'customer', 'customer_id': rows[0].customer_id});
      } else {
        [rows] = await connection.query('SELECT * FROM admin WHERE adminname = ? AND password = ?', [req.session.email, req.session.password]);
      if (rows){
        res.status(200).json({ 'role': 'admin', 'admin_id': rows[0].admin_id});
      }} 
    }
    else {
      // Check if the user is a customer
      let [rows] = await connection.query('SELECT * FROM customers WHERE email = ?', [emailFetch]);
      if (rows && rows[0].password === passwordFetch) {
        req.session.user = rows[0].customer_id;
        req.session.email = emailFetch;
        req.session.password = passwordFetch;
        req.session.role = 'customer';
        if (rememberMe) {
          req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7; //7 days
        }
        res.status(200).json({ 'role': 'customer', 'customer_id': rows[0].customer_id});
      }
      else if (rows && rows[0].password !== passwordFetch) { // Check if the password is wrong
        res.status(401).type("text/plain").send("Wrong Password");
      }
      // Check if the user is an admin
        else {
          [rows] = await connection.query('SELECT * FROM admin WHERE adminname = ? AND password = ?', [emailFetch, passwordFetch]);
          if (rows && rows[0].password === passwordFetch) {
            req.session.users = rows[0].admin_id;
            req.session.email = emailFetch;
            req.session.password = passwordFetch;
            req.session.role = 'admin';
            res.status(200).json({ 'role': 'admin', 'admin_id': rows[0].admin_id});
          }
          else if (rows && rows[0].password !== passwordFetch) { // Check if the password is wrong
            res.status(401).type("text/plain").send("Wrong Password");
        }
      }
    // If the user is not found
    if (!rows) {
      res.status(404).send("No User Exist");
    }
    }

  } catch (error) {
    console.error(error);
    res.status(500).type("text/plain").send("Server Error");
  } finally {
    if (connection) connection.release();
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
// Customer functions
export const getAllProducts = async (req, res) => {
  let connection
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM products');
    res.status(200).json(rows);
  } catch (error) {
    res.status(403).type("text/plain").send(error);
  } finally {
    if (connection) connection.release();
  }
}

export const getProductById = async (req, res) => {
  let connection
  try {
    connection = await pool.getConnection();
    let sqlquery ='SELECT * FROM products WHERE asin = ?'
    const [product] = await connection.query(sqlquery, [req.params.id]);
    sqlquery = 'select rating,review,dateOfReview,username from reviews inner join customers on customers.customer_id = reviews.customer_id';
    const [reviews] = await connection.query(sqlquery);
    res.status(200).json({product, reviews});
  } catch (error) {
    res.status(403).type("text/plain").send(error);
  } finally {
    if (connection) connection.release();
  }
}

// TODO: Test this function
export const searchProducts = async (req, res) => {
  let connection
  try {
    connection = await pool.getConnection();
    const title = req.body.title || '%';
    let category = req.body.category || '%';
    const minPrice = req.body.minPrice || 0;
    const maxPrice = req.body.maxPrice || 1000000;
    const stock = req.body.stock || 0;
    if (category !== '%') {
      const [rows] = await connection.query('SELECT category_id FROM categories WHERE category_name like ?', [category + "%"]);
      category = rows[0].category_id;
    }
    const [rows] = await connection.query('SELECT * FROM products WHERE title like ? AND category_id = ? AND price >= ? AND price <= ? AND stock >= ?', [title, category, minPrice, maxPrice, stock]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(403).type("text/plain").send(error);
  } finally {
    if (connection) connection.release();
  }
}

// TODO: Test this function
export const addReview = async (req, res) => {
  let connection
  try {
    connection = await pool.getConnection();
    const c_id = req.body.customer_id;
    const p_id = req.body.product_id;
    const rating = req.body.rating;
    const review = req.body.review || '';
    const [rows] = await connection.query('INSERT INTO reviews (customer_id, product_id, rating, review) VALUES (?, ?, ?, ?)', [c_id, p_id, rating, review]);
    res.status(201).type("text/plain").send('Success');
  } catch (error) {
    res.status(404).type("text/plain").send(error);
  } finally {
    if (connection) connection.release();
  }
}

export const getCart = async (req, res) => {
  let connection
  try {
    connection = await pool.getConnection();
    const c_id = req.body.customer_id;
    const [rows] = await connection.query('SELECT * FROM shopping_cart WHERE customer_id = ?', [c_id]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(404).type("text/plain").send(error);
  } finally {
    if (connection) connection.release();
  }
  
}

export const addToCart = async (req, res) => {
  let connection
  const c_id = req.body.customer_id;
  const p_id = req.body.product_id;
  const qty = req.body.quantity;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query('INSERT INTO shopping_cart (customer_id, product_id, quantity) VALUES (?, ?, ?)', [c_id, p_id, qty]);
    res.status(201).type("text/plain").send('Success');
  } catch (error) {
    res.status(404).type("text/plain").send(error)
  } finally {
    if (connection) connection.release();
  }
}

export const removeFromCart = async (req, res) => {
  let connection
  try {
    connection = await pool.getConnection();
    const c_id = req.body.customer_id;
    const p_id = req.body.product_id;
    const [rows] = await connection.query('DELETE FROM shopping_cart WHERE customer_id = ? AND product_id = ?', [c_id, p_id]);
    res.status(200).type("text/plain").send('Success');
  } catch (error) {
    res.status(404).type("text/plain").send(error);
  } finally {
    if (connection) connection.release();
  }
}

export const updateCart = async (req, res) => {
  let connection
  try {
    connection = await pool.getConnection();
    const c_id = req.body.customer_id;
    const p_id = req.body.product_id;
    const qty = req.body.quantity;
    const [rows] = await connection.query('UPDATE shopping_cart SET quantity = ? WHERE customer_id = ? AND product_id = ?', [qty, c_id, p_id]);
    res.status(200).type("text/plain").send('Success');
  } catch (error) {
    res.status(404).type("text/plain").send(error);
  } finally {
    if (connection) connection.release();
  }
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



// async function dummyQ(){
//   const [rows, fields] = await connection.query('SELECT * FROM products limit 5');
//   console.log(rows)
// }
// dummyQ();