import API from "../../api/axios";

// Request a withdrawal (vendor)
export const requestWithdrawalApi = async (data) => {
  const response = await API.post("/withdrawals", data, {
    withCredentials: true,
  });
  return response;
};

// Get current vendor withdrawals
export const getMyWithdrawalsApi = async () => {
  const response = await API.get("/withdrawals/getMyWithdrawals", {
    withCredentials: true,
  });
  return response;
};

// Admin: Get all withdrawals
export const getAllWithdrawalsAdminApi = async () => {
  const response = await API.get("/withdrawals/admin/all-withdrawals", {
    withCredentials: true,
  });
  return response;
};

// Admin: Update withdrawal status
export const updateWithdrawalStatusAdminApi = async (withdrawalId, data) => {
  const response = await API.patch(
    `/withdrawals/admin/update-status/${withdrawalId}`,
    data,
    {
      withCredentials: true,
    }
  );
  return response;
};
