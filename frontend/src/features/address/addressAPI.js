import API from "../../api/axios";

export const createAddressApi = async (addressData) => {
  return await API.post("/addresses/", addressData, {
    withCredentials: true, // Required to receive Set-Cookie);
  });
};

export const getUserAddressApi = async () => {
  return await API.get("/addresses/getUserAddresses", {
    withCredentials: true, // Required to receive Set-Cookie);
  });
};

export const deleteAddressApi = async (addressId) => {
  return await API.delete(`/addresses/${addressId}`, {
    withCredentials: true, // Required to receive Set-Cookie);
  });
};

export const updateAddressApi = async (addressId, addressData) => {
  return await API.patch(`/addresses/${addressId}`, addressData, {
    withCredentials: true, // Required to receive Set-Cookie);
  });
};

// export const login = async (loginData) => {
//   return await API.post("/users/login", loginData, {
//     withCredentials: true, // <== required to receive Set-Cookie
//   });
// };
