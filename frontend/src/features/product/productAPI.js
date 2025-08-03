import API from "../../api/axios";

export const createProductApi = async (data) => {
  return await API.post("/products/", data, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};
