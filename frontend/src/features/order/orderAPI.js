import API from "../../api/axios";

export const createOrderApi = async (data) => {
  return await API.post("/parent-orders/", data, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const getShopOrdersApi = async (refundStatus) => {
  return await API.get(`/orders/getOrdersByShop?refundStatus=${refundStatus}`, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const getUserParentOrdersApi = async () => {
  return await API.get(`/parent-orders/getOrdersByUser`, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const getOrderApi = async (orderId, shopId) => {
  return await API.get(`/orders/${orderId}?shopId=${shopId}`, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const requestRefundApi = async (orderId) => {
  return await API.post(
    `/shop-orders/request-refund/${orderId}`,
    {},
    {
      withCredentials: true, // <== required to receive Set-Cookie
    }
  );
};

export const getShopOrdersByCurrentShopApi = async (
  refundOnly = false,
  deliveryStatus = "",
  page = 1,
  limit = 10,
  refundStatus = ""
) => {
  return await API.get(
    `/shop-orders/current-shop?refundOnly=${refundOnly}&deliveryStatus=${deliveryStatus}&page=${page}&limit=${limit}&refundStatus=${refundStatus}`,
    {
      withCredentials: true, // <== required to receive Set-Cookie
    }
  );
};

export const getShopOrderByIdApi = async (orderId) => {
  return await API.get(`/shop-orders/${orderId}`, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const updateDeliveryStatusApi = async (shopOrderId, deliveryStatus) => {
  return await API.patch(
    `/shop-orders/update-delivery-status/${shopOrderId}`,
    {
      deliveryStatus,
    },
    {
      withCredentials: true, // <== required to receive Set-Cookie
    }
  );
};

export const getUserShopOrdersApi = async (refundOnly = false) => {
  return await API.get(
    `/shop-orders/getUserShopOrders?refundOnly=${refundOnly}`,
    {
      withCredentials: true, // <== required to receive Set-Cookie
    }
  );
};

export const updateRefundStatusApi = async (shopOrderId, refundStatus) => {
  return await API.patch(
    `/shop-orders/update-refund-status/${shopOrderId}`,
    {
      refundStatus,
    },
    {
      withCredentials: true, // <== required to receive Set-Cookie
    }
  );
};
