import API from "../../api/axios";

export const createEventApi = async (data) => {
  return await API.post("/events/", data, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};
