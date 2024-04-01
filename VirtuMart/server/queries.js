// Desc: This file contains all the queries that are used to interact with the database
//       Each function must release the connection for better performance.

// TODO: Implement searchProducts
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

const getAllProducts = async (req, res) => {
  let connection
  try {
    connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM products');
    res.status(200).json(rows);
  } catch (error) {
    res.status(403).type("text/plain").send(error);
  } finally {
    if (connection) connection.release();
  }
}

const getProductById = async (req, res) => {
  let connection
  try {
    connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM products WHERE asin = ?', [req.params.id]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(403).type("text/plain").send(error);
  } finally {
    if (connection) connection.release();
  }
}

const searchProducts = async (req, res) => {
  let connection
  try {
    connection = await pool.getConnection();
  } catch (error) {
    res.status(403).type("text/plain").send(error);
  } finally {
    if (connection) connection.release();
  }
}
const getCart = async (req, res) => {
  let connection
  try {
    connection = await pool.getConnection();
    const c_id = req.body.customer_id;
    const [rows, fields] = await connection.query('SELECT * FROM shopping_cart WHERE customer_id = ?', [c_id]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(404).type("text/plain").send(error);
  } finally {
    if (connection) connection.release();
  }
  
}
const addToCart = async (req, res) => {
  let connection
  const c_id = req.body.customer_id;
  const p_id = req.body.product_id;
  const qty = req.body.quantity;
  try {
    connection = await pool.getConnection();
    const [rows, fields] = await connection.query('INSERT INTO shopping_cart (customer_id, product_id, quantity) VALUES (?, ?, ?)', [c_id, p_id, qty]);
    res.status(201).type("text/plain").send('Success');
  } catch (error) {
    res.status(404).type("text/plain").send(error)
  } finally {
    if (connection) connection.release();
  }
}

const removeFromCart = async (req, res) => {
  let connection
  try {
    connection = await pool.getConnection();
    const c_id = req.body.customer_id;
    const p_id = req.body.product_id;
    const [rows, fields] = await connection.query('DELETE FROM shopping_cart WHERE customer_id = ? AND product_id = ?', [c_id, p_id]);
    res.status(200).type("text/plain").send('Success');
  } catch (error) {
    res.status(404).type("text/plain").send(error);
  } finally {
    if (connection) connection.release();
  }
}

const updateCart = async (req, res) => {
  let connection
  try {
    connection = await pool.getConnection();
    const c_id = req.body.customer_id;
    const p_id = req.body.product_id;
    const qty = req.body.quantity;
    const [rows, fields] = await connection.query('UPDATE shopping_cart SET quantity = ? WHERE customer_id = ? AND product_id = ?', [qty, c_id, p_id]);
    res.status(200).type("text/plain").send('Success');
  } catch (error) {
    res.status(404).type("text/plain").send(error);
  } finally {
    if (connection) connection.release();
  }
} 

export default {
    getAllProducts,
    searchProducts,
    getProductById,
    getCart,
    addToCart,
    removeFromCart,
    updateCart
}

// async function dummyQ(){
//   const [rows, fields] = await connection.query('SELECT * FROM products limit 5');
//   console.log(rows)
// }
// dummyQ();