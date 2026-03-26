import api from "./api";

export const getAllEvents = async () => {
  const response = await api.get("/events");
  return response.data;
};

export const getEventById = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

export const registerToEvent = async (eventId) => {
  const response = await api.post(`/events/${eventId}/register`);
  return response.data;
};
