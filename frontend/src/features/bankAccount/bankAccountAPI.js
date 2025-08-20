import API from "../../api/axios";

// Create bank account
export const createBankAccountApi = async (data) => {
  const response = await API.post("/bank-accounts", data, {
    withCredentials: true,
  });
  return response;
};

// Get all bank accounts for current user
export const getBankAccountsApi = async () => {
  const response = await API.get("/bank-accounts", {
    withCredentials: true,
  });
  return response;
};

// Get single bank account by ID
export const getBankAccountByIdApi = async (id) => {
  const response = await API.get(`/bank-accounts/${id}`, {
    withCredentials: true,
  });
  return response;
};

// Update bank account
export const updateBankAccountApi = async ({ id, data }) => {
  const response = await API.put(`/bank-accounts/${id}`, data, {
    withCredentials: true,
  });
  return response;
};

// Delete bank account
export const deleteBankAccountApi = async (id) => {
  const response = await API.delete(`/bank-accounts/${id}`, {
    withCredentials: true,
  });
  return response;
};
