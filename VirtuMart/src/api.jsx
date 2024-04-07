import axios from "axios";

axios.defaults.method = "POST";
axios.defaults.baseURL = "http://localhost:3000/";

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
  if (res.data.status !== true || res.data.code !== 200) {
    throw new ServerError(res.data.status, res.data.code, res.data.message);
  }
  return res.data.data;
};

const Api = {
  login: async function ({ email, password, rememberMe, signal }) {
    return handleServerResponse(
      await axios.post("/login", { email, password, rememberMe }, { signal }),
    );
  },
  logout: async function ({ signal }) {
    return handleServerResponse(await axios.post("/logout", {}, { signal }));
  },
};

export default Api;
