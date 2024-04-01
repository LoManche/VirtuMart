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

// Serve the app in dist(created by npm run build)
app.use(express.static('dist'));

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


