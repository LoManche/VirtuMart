// Programmer: Ng Tiffany 1155158907
// Date: 2024-04-11
// Purpose:
//    Create the API routes for front end functions to access the server API routes

import axios from "axios";
axios.defaults.method = "POST";
axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
export class ServerError extends Error {
  constructor(status, code, message) {
    super(
      message
        ? `Status: ${status}, Server code: ${code}, Message: ${message}`
        : `Status: ${status}, Server code: ${code}`,
    );
    this.code = code;
    this.message = message;
  }
}

const handleServerResponse = (res) => {
  if (![200, 201].includes(res.status)) {
    throw new ServerError(res.status, res.code, res.message);
  }
  return res.data;
};

const Api = {
  // Authentication
  login: async function ({ email, password, rememberMe }) {
    return handleServerResponse(await axios.post("/login", { email, password, rememberMe }));
  },
  logout: async function () {
    return handleServerResponse(await axios.post("/logout"));
  },
  signUp: async function ({ email }) {
    return handleServerResponse(await axios.post("/signup", { email }));
  },
  signUpOTP: async function ({ email, otp }) {
    return handleServerResponse(await axios.post("/signup/otp", { email, otp }));
  },
  signUpSetup: async function ({
    username,
    firstName,
    lastName,
    address,
    phone,
    city,
    state,
    password,
    email,
  }) {
    return handleServerResponse(
      await axios.post("/signup/setup", {
        username,
        firstName,
        lastName,
        address,
        phone,
        city,
        state,
        password,
        email,
      }),
    );
  },
  forgotPassword: async function ({ email }) {
    return handleServerResponse(await axios.post("/forgotpassword", { email }));
  },
  resetPassword: async function ({ hashed, newpassword }) {
    return handleServerResponse(await axios.post(`/resetpassword`, { hashed, newpassword }));
  },
  // product
  allProduct: async function () {
    return handleServerResponse(await axios.get("/product"));
  },
  getProductById: async function ({ product_id }) {
    return handleServerResponse(await axios.get(`/product/${product_id.productId}`));
  },
  search: async function ({ title, category, minPrice, maxPrice, stock }) {
    return handleServerResponse(
      await axios.post("/search", { title, category, minPrice, maxPrice, stock }),
    );
  },

  // Recommendation and Notification
  getRandomProducts: async function () {
    return handleServerResponse(await axios.get("/randomproduct"));
  },
  recommendation: async function ({ customer_id }) {
    return handleServerResponse(await axios.post("/recommendation", { customer_id }));
  },
  notification: async function ({ customer_id }) {
    return handleServerResponse(await axios.post("/notification", { customer_id }));
  },
  discount: async function () {
    return handleServerResponse(await axios.get("/discount"));
  },

  // Admin
  adminChangePassword: async function ({ oldpassword, newpassword, admin_id }) {
    return handleServerResponse(
      await axios.post("/admin/changePassword", { oldpassword, newpassword, admin_id }),
    );
  },
  adminAllProduct: async function () {
    return handleServerResponse(await axios.get("/admin/product"));
  },
  adminAddProduct: async function ({
    asin,
    title,
    imgURL,
    rating = 0,
    price,
    discount,
    category_id,
    description,
    stock,
  }) {
    return handleServerResponse(
      await axios.post("/admin/product/add", {
        asin,
        title,
        imgURL,
        rating,
        price,
        discount,
        category_id,
        description,
        stock,
      }),
    );
  },
  adminUpdateProduct: async function ({
    asin,
    title,
    imgURL,
    rating,
    price,
    discount,
    category_id,
    description,
    stock,
  }) {
    return handleServerResponse(
      await axios.put("/admin/product/update", {
        asin,
        title,
        imgURL,
        rating,
        price,
        discount,
        category_id,
        description,
        stock,
      }),
    );
  },
  adminDeleteProduct: async function ({ asin }) {
    return handleServerResponse(await axios.post("/admin/product/delete", { asin }));
  },
  /////////////////////////////
  allUser: async function () {
    return handleServerResponse(await axios.get("/admin/customer"));
  },
  getSpecificUser: async function ({ customer_id }) {
    return handleServerResponse(await axios.post("/admin/customerById", { customer_id }));
  },
  adminUpdateUser: async function ({
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
  }) {
    return handleServerResponse(
      await axios.put("/admin/customer/update", {
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
      }),
    );
  },
  adminDeleteUser: async function ({ customer_id }) {
    return handleServerResponse(await axios.post("/admin/customer/delete", { customer_id }));
  },
  ///////////////////////////
  allCategory: async function () {
    return handleServerResponse(await axios.get("/category"));
  },
  adminAddCategory: async function ({ category_name }) {
    return handleServerResponse(await axios.post("/admin/category/add", { category_name }));
  },
  adminUpdateCategory: async function ({ category_id, category_name }) {
    return handleServerResponse(
      await axios.put("/admin/category/update", { category_id, category_name }),
    );
  },
  adminDeleteCategory: async function ({ category_id }) {
    return handleServerResponse(await axios.post("/admin/category/delete", { category_id }));
  },
  ///////////////////////////
  allAdmin: async function () {
    return handleServerResponse(await axios.get("/admin/admin"));
  },
  adminAddAdmin: async function ({ adminname, password }) {
    return handleServerResponse(await axios.post("/admin/admin/add", { adminname, password }));
  },
  adminUpdateAdmin: async function ({ admin_id, adminname, password }) {
    return handleServerResponse(
      await axios.put("/admin/admin/update", { admin_id, adminname, password }),
    );
  },
  adminDeleteAdmin: async function ({ admin_id }) {
    return handleServerResponse(await axios.post("/admin/admin/delete", { admin_id }));
  },

  //customer
  getProfile: async function ({ customer_id }) {
    return handleServerResponse(await axios.post("/getprofile", { customer_id }));
  },
  updateProfile: async function ({
    customer_id,
    username,
    firstName,
    lastName,
    phone,
    city,
    state,
    password,
    email,
    address,
  }) {
    return handleServerResponse(
      await axios.put("/profile", {
        customer_id,
        username,
        firstName,
        lastName,
        phone,
        city,
        state,
        password,
        email,
        address,
      }),
    );
  },
  updatePassword: async function ({ oldpassword, newpassword, customer_id }) {
    return handleServerResponse(
      await axios.post("/changepassword", { oldpassword, newpassword, customer_id }),
    );
  },

  //productPage

  addReview: async function ({ product_id, rating, customer_id, review }) {
    return handleServerResponse(
      axios.put("/review/add", { product_id: product_id.productId, rating, customer_id, review }),
    );
  },

  addToCart: async function ({ customer_id, product_id, quantity }) {
    return handleServerResponse(
      await axios.post("/cart", {
        customer_id,
        product_id,
        quantity,
      }),
    );
  },
  removeFromCart: async function ({ customer_id, product_id }) {
    return handleServerResponse(await axios.post("/cart/remove", { customer_id, product_id }));
  },
  updateCart: async function ({ customer_id, product_id, quantity }) {
    return handleServerResponse(
      await axios.post("/cart/update", { customer_id, product_id, quantity }),
    );
  },
  getCart: async function ({ customer_id }) {
    return handleServerResponse(await axios.post("/cart", { customer_id }));
  },
  placeOrder: async function ({
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
  }) {
    return handleServerResponse(
      await axios.post("/placeorder", {
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
      }),
    );
  },
  getAllOrder: async function ({ customer_id }) {
    return handleServerResponse(await axios.post("/order", { customer_id }));
  },
  getOrderById: async function ({ customer_id, order_id }) {
    return handleServerResponse(await axios.post("/orderById", { customer_id, order_id }));
  },
};

export default Api;
