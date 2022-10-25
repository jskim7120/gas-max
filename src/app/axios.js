import axios from "axios";

export const baseURL = "http://115.95.25.245:9998";

const API = axios.create({
  baseURL: baseURL,
});

export default API;

API.interceptors.request.use(async (req) => {
  return req;
});

API.interceptors.response.use(
  function (res) {
    return res;
  },
  function (err) {
    if (err.response.status === 401) {
      localStorage.removeItem("token");
      window.location.assign("/login");
    }
    return err;
  }
);
