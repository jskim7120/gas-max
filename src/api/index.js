import axios from "axios";
import { Navigate } from "react-router-dom";

export const baseURL = "http://115.95.25.245:9998/";
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
    const { status, data, config } = err.response;

    if (status === 0) {
      //window.location.assign("/network-error");
      // <Navigate to="/network-error" />;
    }

    return Promise.reject(data);
  }
);
