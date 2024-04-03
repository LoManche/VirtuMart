//import React from "react";
//import { renderToString } from "react-dom/server";
//import { StaticRouter } from "react-router-dom/server";
import express from "express";
import session from "express-session";
import cors from "cors";
import process from "process";

import queries from "./queries.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(
  session({
    secret: "virtumartserverisawesome",
    name: "sessionId",
    saveUninitialized: false,
    resave: true,
    rolling: true,
  }),
);
// Middleware to check if the user is authenticated
function isAdminAuthenticated(req, res, next) {
  if (req.session.role === "admin" && req.session.user) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

function isCustomerAuthenticated(req, res, next) {
  if (req.session.role === "customer" && req.session.user) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}
// Serve the app in dist(created by npm run build)
app.use(express.static("dist"));

// Login related APIs
app.post("/login", queries.handleLogin);
app.post("/logout", queries.handleLogout);
app.post("/signup", queries.signUp);
// Product related APIs
app.get("/product", queries.getAllProducts);
app.get("/product/:id", queries.getProductById);
app.post("/search", queries.searchProducts);
// Review related APIs
app.put("/review/add", isCustomerAuthenticated, queries.addReview);

// Shopping cart related APIs
app.get("/cart", queries.getCart);
app.post("/cart/add", queries.addToCart);
app.post("/cart/remove", queries.removeFromCart);
app.post("/cart/update", queries.updateCart);

// Order related APIs
app.post("/placeorder", queries.placeOrder);
app.get("/order", queries.getAllOrder);
app.get("/order/:id", queries.getOrderById);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
