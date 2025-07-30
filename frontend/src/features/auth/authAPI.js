import API from "../../api/axios";

export const register = async (userData) => {
  return await API.post("/users/register", userData);
};

export const login = async (loginData) => {
  return await API.post("/users/login", loginData, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const verifyToken = async (token) => {
  return await API.get(`/users/verify-token/${token}`);
};
