import { selectors } from "./selectors";

export const data = {
  cardList: document.querySelector(`.${selectors.cardsPlace}`),
  cardTemplate: document.querySelector(`#${selectors.temlate.card}`).content,
  buttons: {
    addCard: document.querySelector(`.${selectors.buttons.addCard}`),
    editProfile: document.querySelector(`.${selectors.buttons.editProfile}`),
  },
  userInfo: {
    title: document.querySelector(`.${selectors.userInfo.title}`),
    description: document.querySelector(`.${selectors.userInfo.description}`),
  },
};