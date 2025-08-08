import API from "../../api/axios";

export const createOrderApi = async (data) => {
  return await API.post("/orders/", data, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const getShopOrdersApi = async () => {
  return await API.get(`/orders/getOrdersByShop`, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const getUserOrdersApi = async () => {
  return await API.get(`/orders/getOrdersByUser`, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const getOrderApi = async (orderId) => {
  return await API.get(`/orders/${orderId}`, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const requestRefundApi = async (orderId) => {
  return await API.post(
    `/orders/requestRefund/${orderId}`,
    {},
    {
      withCredentials: true, // <== required to receive Set-Cookie
    }
  );
};
