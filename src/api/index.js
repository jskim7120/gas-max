import axios from "axios";

export const baseURL = "http://115.95.25.245:9999/";
const API = axios.create({
  baseURL: baseURL,
});

export default API;
