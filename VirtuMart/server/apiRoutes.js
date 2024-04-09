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

router.post("/login", queries.handleLogin);
router.post("/logout", queries.handleLogout);
router.post("/signup", queries.signUp);
router.post("/signup/otp", queries.signUpOTP);
router.post("/signup/setup", queries.signUpSetup);
router.post("/forgotpassword", queries.forgotPassword);
router.post("/resetpassword", queries.resetPassword);
router.post("/changepassword", queries.changePassword);

router.put("/profile", isCustomerAuthenticated, queries.updateCustomer);
router.post("/getprofile", isCustomerAuthenticated, queries.getCustomerProfile);

// Product related APIs
router.get("/product", queries.getAllProducts);
router.get("/product/:id", queries.getProductById);
router.post("/search", queries.searchProducts);

// Shopping cart related APIs
router.get("/cart", queries.getCart);
router.post("/cart/add", queries.addToCart);
router.delete("/cart/remove", queries.removeFromCart);
router.post("/cart/update", queries.updateCart);

// Review related APIs
router.put("/review/add", isCustomerAuthenticated, queries.addReview);

// Order related APIs
router.post("/placeorder", isCustomerAuthenticated, queries.placeOrder);
router.get("/order", isCustomerAuthenticated, queries.getAllOrder);
router.get("/orderById", isCustomerAuthenticated, queries.getOrderById);

// Admin related APIs
router.use("/admin", isAdminAuthenticated);

router.post("/admin/product/add", queries.addProduct);
router.put("/admin/product/update", queries.updateProduct);
router.delete("/admin/product/delete", queries.deleteProduct);

router.get("/admin/customer", queries.getAllCustomers);
router.get("/admin/customerById", queries.getCustomerById);
router.put("/admin/customer/update", queries.updateCustomer);
router.delete("/admin/customer/delete", queries.deleteCustomer);

router.get("/admin/category", queries.getAllCategories);
router.post("/admin/category/add", queries.addCategory);
router.put("/admin/category/update", queries.updateCategory);
router.delete("/admin/category/delete", queries.deleteCategory);

router.get("/admin/admin", queries.getAllAdmin);
router.post("/admin/admin/add", queries.addAdmin);
router.put("/admin/admin/update", queries.updateAdmin);
router.delete("/admin/admin/delete", queries.deleteAdmin);

export default router;
