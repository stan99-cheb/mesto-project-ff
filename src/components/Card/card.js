import { selectors } from "../../utils/selectors";

const cardTemplate = document.querySelector(`#${selectors.temlate.card}`).content;

export function Card(selectors, cardData, cbDelete, cbLike, cbShow) {
  this.cardElement = cardTemplate.querySelector(`.${selectors.card}`).cloneNode(true);
  this.cardDeleteButton = this.cardElement.querySelector(`.${selectors.deleteButton}`);
  this.cardLikeButton = this.cardElement.querySelector(`.${selectors.likeButton}`);
  this.cardImage = this.cardElement.querySelector(`.${selectors.image}`);

  this.cardElement.querySelector(`.${selectors.title}`).textContent = cardData.name;
  this.cardElement.querySelector(`.${selectors.image}`).src = cardData.link;
  this.cardElement.querySelector(`.${selectors.image}`).alt = `фотография ${cardData.name}`;

  this.setEventListener = (element, type, callback, options = {}) => {
    element.addEventListener(type, callback, options);
  };

  this.create = () => {
    return this.cardElement;
  };

  this.delete = () => {
    this.cardElement.remove();
    cbDelete(cardData);
  };

  this.like = () => {
    cbLike(this.cardLikeButton);
  };

  this.show = () => {
    cbShow(this.cardImage);
  };

  this.render = (cardList, card, method = 'prepend') => {
    cardList[method](card);
  };

  this.setEventListener(this.cardDeleteButton, 'click', this.delete, { once: true });
  this.setEventListener(this.cardLikeButton, 'click', this.like);
  this.setEventListener(this.cardImage, 'click', this.show);

  return {
    create: this.create,
    render: this.render,
  }
};