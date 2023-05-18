import axios from "axios";
import { toast } from "react-toastify";

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

export const apiPost = async (path, params, msg) => {
  try {
    const res = await API.post(path, params);

    if (res.status === 200) {
      toast.success(msg, {
        autoClose: 500,
      });
      return true;
    } else {
      alert(res?.response?.data?.message);
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};

export const apiGet = async (path, params) => {
  try {
    const res = await API.get(path, { params: params });

    if (res.status === 200) {
      return res.data;
    } else {
      alert(res?.response?.data?.message);
    }
    return null;
  } catch (err) {
    console.log(err);
  }
};
