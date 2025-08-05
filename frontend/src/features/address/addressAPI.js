import API from "../../api/axios";

export const createAddressApi = async (addressData) => {
  return await API.post("/addresses/", addressData, {
    withCredentials: true, // Required to receive Set-Cookie);
  });
};

// export const login = async (loginData) => {
//   return await API.post("/users/login", loginData, {
//     withCredentials: true, // <== required to receive Set-Cookie
//   });
// };
