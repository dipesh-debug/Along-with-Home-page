import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

export const login = async ({ email, password }) => {
  try {
    const { data } = await api.post("http://127.0.0.1:8000/api/user/login/user/", { email, password });
    return data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const signup = async ({ name, email, password }) => {
  try {
    const { data } = await api.post("http://127.0.0.1:8000/api/user/register/", { name, email, password });
    return data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
