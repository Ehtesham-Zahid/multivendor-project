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

export const getShopEventsApi = async ({ page, limit }) => {
  return await API.get(`/events/getShopEvents?page=${page}&limit=${limit}`, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const updateEventApi = async (eventId, data) => {
  return await API.patch(`/events/${eventId}`, data, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const getActiveEventsApi = async ({ sortBy, limit }) => {
  const params = new URLSearchParams();

  if (sortBy) params.append("sortBy", sortBy);
  if (limit) params.append("limit", limit);

  console.log(`/events/getActiveEvents/?${params.toString()}`);

  return await API.get(`/events/getActiveEvents/?${params.toString()}`);
};

export const getAllEventsAdminApi = async ({
  page,
  limit,
  onlyActive = "",
  sortBy,
}) => {
  return await API.get(
    `/events/admin/all-events?page=${page}&limit=${limit}&onlyActive=${onlyActive}&sortBy=${sortBy}`,
    {
      withCredentials: true, // <== required to receive Set-Cookie
    }
  );
};
