import API from "../../api/axios";

export const createShopApi = async (shopData) => {
  return await API.post("/shops/create-shop", shopData, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const getShopApi = async (shopId) => {
  return await API.get(`/shops/${shopId}`, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};
