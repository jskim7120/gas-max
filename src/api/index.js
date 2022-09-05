import axios from "axios";

const API = axios.create({
  baseURL: "https://api.thedogapi.com/v1",
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
    if (typeof window !== "undefined" && err.response.status === 401) {
      console.log("something went wrong");
    }
    return Promise.reject(err.response.data);
  }
);
