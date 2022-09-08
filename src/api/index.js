import axios from "axios";

const API = axios.create({
  baseURL: "http://115.95.25.245:9999/",
});

export default API;
