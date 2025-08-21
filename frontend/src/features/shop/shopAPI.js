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

export const getShopByIdApi = async (shopId) => {
  return await API.get(`/shops/${shopId}`);
};

export const getAllShopsApi = async ({ page, limit, onlyActive }) => {
  return await API.get(
    `/shops/admin/all-shops?page=${page}&limit=${limit}&onlyActive=${onlyActive}`,
    {
      withCredentials: true, // <== required to receive Set-Cookie
    }
  );
};

export const updateShopStatusApi = async (shopId) => {
  return await API.patch(`/shops/update-shop-status/${shopId}`, null, {
    withCredentials: true,
  });
};
