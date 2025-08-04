import API from "../../api/axios";

export const createOrderApi = async (data) => {
  return await API.post("/orders/", data, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};
