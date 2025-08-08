import API from "../../api/axios";

export const createCouponApi = async (data) => {
  return await API.post("/coupons/", data, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const deleteCouponApi = async (couponId) => {
  return await API.delete(`/coupons/${couponId}`, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const validateCouponApi = async (data) => {
  return await API.post(`/coupons/validate`, data, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};
