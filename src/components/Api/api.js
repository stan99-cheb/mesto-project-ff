import { BASE_URL } from "../../utils/constants";

const HEADERS = {
  headers: {
    authorization: import.meta.env.VITE_TOKEN,
    'Content-Type': 'application/json',
  },
};

const request = (endpoint, options) =>
  fetch(`${BASE_URL}${endpoint}`, options);

const checkResponse = (res) => {
  if (res.ok) return res.json();
  throw new Error(res.status.toString());
};

export const getCards = () =>
  request('/cards', {
    ...HEADERS
  })
    .then(checkResponse);

export const getUser = () =>
  request('/users/me', {
    ...HEADERS
  })
    .then(checkResponse);

export const setUser = (user) =>
  request('/users/me', {
    method: 'PATCH',
    ...HEADERS,
    body: JSON.stringify({
      name: user.name,
      about: user.about,
    }),
  })
    .then(checkResponse);

export const addCard = (card) =>
  request('/cards', {
    method: 'POST',
    ...HEADERS,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  })
    .then(checkResponse);

export const delCard = (id) =>
  request(`/cards/${id}`, {
    method: 'DELETE',
    ...HEADERS,
  })
    .then(checkResponse);

export const addLike = (id) =>
  request(`/cards/likes/${id}`, {
    method: 'PUT',
    ...HEADERS,
  })
    .then(checkResponse);

export const delLike = (id) =>
  request(`/cards/likes/${id}`, {
    method: 'DELETE',
    ...HEADERS,
  })
    .then(checkResponse);

export const setAvatar = (link) =>
  request('/users/me/avatar', {
    method: 'PATCH',
    ...HEADERS,
    body: JSON.stringify({
      avatar: link,
    }),
  })
    .then(checkResponse);