import { Card } from "./components/Card/card";
import { cardSelectors } from "./utils/constants";
import initialCards from "./data/cards-data.json";
import './index.css';

const cardList = document.querySelector('.places__list');

const cardDel = (cardData) => {
  console.log(`Карточка ${cardData.name} удалена`);
};

const cardLike = (cardLikeButton) => {
  cardLikeButton.classList.toggle('card__like-button_is-active');
};

const cardShow = (cardImage) => {
  console.log(cardImage);
};

const renderCard = (cardData, method = 'prepend') => {
  const card = new Card(cardSelectors, cardData, cardDel, cardLike, cardShow);
  cardList[method](card.create());
};

initialCards.forEach(cardData => {
  renderCard(cardData, 'append');
});