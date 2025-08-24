import API from "../../api/axios";

export const getOrCreateConversation = async (shopId) => {
  // Manual token extraction as backup
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return await API.get(`/conversations/get-or-create/${shopId}`, {
    withCredentials: true,
    headers,
  });
};

export const sendMessageApi = async (data) => {
  return await API.post(`/messages?isShop=${data.isShop}`, data, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const getUserConversationsApi = async () => {
  return await API.get("/conversations/user-conversations", {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const getShopConversationsApi = async () => {
  return await API.get("/conversations/shop-conversations", {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const getMessagesApi = async (conversationId, isShop) => {
  return await API.get(`/messages/${conversationId}?isShop=${isShop}`, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};

export const getUnreadCountApi = async (isShop) => {
  return await API.get(`/conversations/unread-count?isShop=${isShop}`, {
    withCredentials: true, // <== required to receive Set-Cookie
  });
};
