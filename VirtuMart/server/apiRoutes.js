// Programmer: Lo Yat Fung 1155158670, Lai Cheuk Lam 1155159309
// Date: 2024-04-11
// Purpose:
//    Create the API routes for the server, all the API routes are defined here.
// Called By: server.js
// This file is called by server.js by exporting the router object, which contains all the API routes.
// Requires: queries.js to implement the queries for the API routes
import express from "express";
const router = express.Router();
import * as queries from "./queries.js";

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
// API routes
// Login and Signup related APIs
router.post("/login", queries.handleLogin);
router.post("/logout", queries.handleLogout);
router.post("/signup", queries.signUp);
router.post("/signup/otp", queries.signUpOTP);
router.post("/signup/setup", queries.signUpSetup);
router.post("/forgotpassword", queries.forgotPassword);
router.post("/resetpassword", queries.resetPassword);
router.post("/changepassword", queries.changePassword);

// Profile related APIs
router.put("/profile", isCustomerAuthenticated, queries.updateCustomer);
router.post("/getprofile", isCustomerAuthenticated, queries.getCustomerProfile);

// Product related APIs
router.get("/category", queries.getAllCategories);
router.get("/randomproduct", queries.getRandomProducts);
router.get("/product", queries.getAllProducts);
router.get("/product/:id", queries.getProductById);
router.post("/search", queries.searchProducts);

// Shopping cart related APIs
router.get("/cart", queries.getCart);
router.post("/cart/add", queries.addToCart);
router.delete("/cart/remove", queries.removeFromCart);
router.post("/cart/update", queries.updateCart);

// Review related APIs
router.put("/review/add", queries.addReview);
// Recommendation and Notification
router.post("/recommendation", queries.getRecommendation);
router.post("/notification", queries.getNotification);
router.get("/discount", queries.getDiscount);

// Order related APIs
router.post("/placeorder", isCustomerAuthenticated, queries.placeOrder);
router.get("/order", isCustomerAuthenticated, queries.getAllOrder);
router.get("/orderById", isCustomerAuthenticated, queries.getOrderById);

// Admin related APIs
router.use("/admin", isAdminAuthenticated);

router.get("/admin/product", queries.getAllProductAdmin);
router.post("/admin/product/add", queries.addProduct);
router.put("/admin/product/update", queries.updateProduct);
router.post("/admin/product/delete", queries.deleteProduct);

router.get("/admin/customer", queries.getAllCustomers);
router.post("/admin/customerById", queries.getCustomerById);
router.put("/admin/customer/update", queries.updateCustomer);
router.post("/admin/customer/delete", queries.deleteCustomer);
router.post("/admin/changePassword", queries.changeAdminPassword);

router.post("/admin/category/add", queries.addCategory);
router.put("/admin/category/update", queries.updateCategory);
router.post("/admin/category/delete", queries.deleteCategory);

router.get("/admin/admin", queries.getAllAdmin);
router.post("/admin/admin/add", queries.addAdmin);
router.put("/admin/admin/update", queries.updateAdmin);
router.post("/admin/admin/delete", queries.deleteAdmin);
// Exporting the router object
export default router;
