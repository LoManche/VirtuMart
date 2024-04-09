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

/* Example to use api to get data
  const [products, setProducts] = useState(undefined);
  const onLoadProducts = async () => {
    try {
      const products = await Api.allProduct();
      setProducts(products);
    } catch (err) {
      handleError(err, () => {}, true);
      throw err;
    }
  };

  useEffect(() => {
    onLoadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
*/

const Api = {
  //authentication
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

  //visitor
  allProduct: async function () {
    return handleServerResponse(await axios.get("/product"));
  },

  //admin
  allUser: async function () {
    return handleServerResponse(await axios.get("/admin/customer"));
  },
  allCategory: async function () {
    return handleServerResponse(await axios.get("/admin/category"));
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
  // updatePassword: async function ({ oldPs, newPs }) {
  //   return handleServerResponse(await axios.post("/updatePs", { oldPs, newPs }));
  // },
};

export default Api;
