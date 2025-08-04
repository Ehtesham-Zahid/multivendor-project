import API from "../../api/axios";

export const createShopApi = async (shopData) => {
  return await API.post("/shops/create-shop", shopData, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const getCurrentUserShopApi = async () => {
  return await API.get(`/shops/getCurrentUserShop`, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const updateCurrentUserShopApi = async (shopData) => {
  return await API.patch(`/shops/updateCurrentUserShop`, shopData, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};
