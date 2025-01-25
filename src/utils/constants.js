import { selectors } from "./selectors";

export const BASE_URL = 'https://nomoreparties.co/v1/wff-cohort-31';

export const data = {
  cardList: document.querySelector(`.${selectors.cardsPlace}`),
  cardTemplate: document.querySelector(`#${selectors.temlate.card}`).content,
  buttons: {
    addCard: document.querySelector(`.${selectors.buttons.addCard}`),
    editProfile: document.querySelector(`.${selectors.buttons.editProfile}`),
    editAvatar: document.querySelector(`.${selectors.buttons.editAvatar}`),
  },
  userInfo: {
    title: document.querySelector(`.${selectors.userInfo.title}`),
    description: document.querySelector(`.${selectors.userInfo.description}`),
    avatar: document.querySelector(`.${selectors.userInfo.avatar}`),
  },
  cardInfo: {
    name: 'name',
    link: 'link',
  },
};