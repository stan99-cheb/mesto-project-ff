import { BASE_URL } from "../../utils/constants";

const HEADERS = {
  headers: {
    authorization: import.meta.env.VITE_TOKEN,
    'Content-Type': 'application/json',
  },
};

const checkResponse = (res) => {
  if (res.ok) return res.json();
  throw new Error(res.status.toString());
};

const request = (endpoint, options) =>
  fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse);

export const getCards = () =>
  request('/cards', {
    ...HEADERS
  });

export const getUser = () =>
  request('/users/me', {
    ...HEADERS
  });

export const setUser = (user) =>
  request('/users/me', {
    method: 'PATCH',
    ...HEADERS,
    body: JSON.stringify({
      name: user.name,
      about: user.about,
    }),
  });

export const addCard = (card) =>
  request('/cards', {
    method: 'POST',
    ...HEADERS,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  });

export const delCard = (id) =>
  request(`/cards/${id}`, {
    method: 'DELETE',
    ...HEADERS,
  });

export const addLike = (id) =>
  request(`/cards/likes/${id}`, {
    method: 'PUT',
    ...HEADERS,
  });

export const delLike = (id) =>
  request(`/cards/likes/${id}`, {
    method: 'DELETE',
    ...HEADERS,
  });

export const setAvatar = (link) =>
  request('/users/me/avatar', {
    method: 'PATCH',
    ...HEADERS,
    body: JSON.stringify({
      avatar: link,
    }),
  });