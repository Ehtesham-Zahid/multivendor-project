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

export const getMe = async () => {
  return await API.get(`/users/me`, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const updateMeAPI = async (data) => {
  return await API.patch(`/users/update-me`, data, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const changePasswordAPI = async (data) => {
  return await API.patch(`/users/change-password`, data, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const logoutAPI = async () => {
  return await API.post(
    `/users/logout`,
    {},
    {
      withCredentials: true, // <== required to receive Set-Cookie
    }
  );
};
