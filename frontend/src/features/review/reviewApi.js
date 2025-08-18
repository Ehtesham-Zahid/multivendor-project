import API from "../../api/axios";

export const createReviewApi = async (reviewData) => {
  return await API.post("/reviews", reviewData, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const getShopReviewsApi = async (shopId) => {
  return await API.get(`/reviews/shop/${shopId}`, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const getProductReviewsApi = async (productId) => {
  return await API.get(`/reviews/product/${productId}`, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const updateReviewApi = async (reviewId, reviewData) => {
  return await API.patch(`/reviews/${reviewId}`, reviewData, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const deleteReviewApi = async (reviewId) => {
  return await API.delete(`/reviews/${reviewId}`, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};
