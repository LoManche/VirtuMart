import axios from "axios";

axios.defaults.method = "POST";
axios.defaults.baseURL = "http://localhost:3000";

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
/**
 * @param {import("axios").AxiosResponse} res
 */
const handleServerResponse = (res) => {
  if (res.status !== 200) {
    throw new ServerError(res.data.status, res.data.code, res.data.message);
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
  login: async function ({ email, password, rememberMe }) {
    return handleServerResponse(await axios.post("/login", { email, password, rememberMe }));
  },
  logout: async function () {
    return handleServerResponse(await axios.post("/logout"));
  },
  allProduct: async function () {
    return handleServerResponse(await axios.get("/product"));
  },
};

export default Api;
