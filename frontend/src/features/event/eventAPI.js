import API from "../../api/axios";

export const createEventApi = async (data) => {
  return await API.post("/events/", data, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const deleteEventApi = async (eventId) => {
  return await API.delete(`/events/${eventId}`, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const getShopEventsApi = async () => {
  return await API.get("/events/getShopEvents", {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const updateEventApi = async (eventId, data) => {
  return await API.patch(`/events/${eventId}`, data, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const getActiveEventsApi = async () => {
  return await API.get(`/events/getActiveEvents/`);
};
