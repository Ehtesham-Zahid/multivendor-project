import API from "../../api/axios";

export const createProductApi = async (data) => {
  return await API.post("/products/", data, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const getProductsByShopApi = async () => {
  return await API.get("/products/getProductsByShop", {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const updateProductApi = async (id, data) => {
  return await API.patch(`/products/${id}`, data, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const deleteProductApi = async (id) => {
  return await API.delete(`/products/${id}`, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const getAllProductsApi = async () => {
  return await API.get(`/products/`);
};

export const getProductByIdApi = async (id) => {
  return await API.get(`/products/${id}`);
};
