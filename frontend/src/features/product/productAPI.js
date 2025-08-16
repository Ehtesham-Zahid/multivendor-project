import API from "../../api/axios";

export const createProductApi = async (data) => {
  return await API.post("/products/", data, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const getProductsByShopApi = async ({ page, limit }) => {
  return await API.get(
    `/products/getProductsByShop?page=${page}&limit=${limit}`,
    {
      withCredentials: true, // <== required to receive Set-Cookie
    }
  );
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

export const getAllProductsApi = async ({
  page,
  limit,
  category,
  sortBy,
  search,
  isFeatured,
}) => {
  const params = new URLSearchParams();

  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);
  if (category) params.append("category", category);
  if (sortBy) params.append("sortBy", sortBy);
  if (search) params.append("search", search);
  if (isFeatured) params.append("isFeatured", isFeatured);

  return await API.get(`/products?${params.toString()}`);
};

export const getProductByIdApi = async (id) => {
  return await API.get(`/products/${id}`);
};

export const getProductsByCategoryApi = async (category) => {
  return await API.get(`/products/category/${category}`);
};

export const getAllProductsAdminApi = async ({
  page,
  limit,
  onlyActive,
  sortBy,
}) => {
  return await API.get(
    `/products/admin/all-products?page=${page}&limit=${limit}&onlyActive=${onlyActive}&sortBy=${sortBy}`,
    {
      withCredentials: true, // <== required to receive Set-Cookie
    }
  );
};
