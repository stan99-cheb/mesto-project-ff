import { Card } from "./components/Card/card";
import { selectors } from "./utils/selectors";
import initialCards from "./data/cards-data";
import './index.css';

const cardList = document.querySelector(`.${selectors.cardsPlace}`);

// -------------------------------- Колбэки Card --------------------------------
const cardDel = (cardData) => {
  console.log(`Карточка ${cardData.name} удалена`);
};

const cardLike = (cardLikeButton) => {
  cardLikeButton.classList.toggle('card__like-button_is-active');
};

const cardShow = (cardImage) => {
  console.log(cardImage);
};
// ------------------------------------------------------------------------------

initialCards.forEach(dataCard => {
  const card = new Card(selectors.card, dataCard, cardDel, cardLike, cardShow);
  card.render(cardList, card.create(), 'append');
});