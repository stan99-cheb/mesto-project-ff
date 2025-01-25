import { checkTypes } from '../../utils/check-types';
import { data } from '../../utils/constants';
/**
 * Конструктор для карточки
 * @param {object} selectors 
 * @param {function} cbDelete 
 * @param {function} cbLike 
 * @param {function} cbShow 
 * @returns {object} объект с методами create, render
 */
export function Card(cardData, selectors, cbDelete, cbLike, cbShow, user) {
  checkTypes(arguments, ['object', 'object', 'function', 'function', 'function', 'object']);

  this.cardElement = data.cardTemplate.querySelector(`.${selectors.element}`).cloneNode(true);
  this.cardDeleteButton = this.cardElement.querySelector(`.${selectors.deleteButton}`);
  this.cardLikeButton = this.cardElement.querySelector(`.${selectors.likeButton}`);
  this.cardImage = this.cardElement.querySelector(`.${selectors.image}`);
  this.cardTitle = this.cardElement.querySelector(`.${selectors.title}`);
  this.cardLink = this.cardElement.querySelector(`.${selectors.image}`);
  this.cardLikeCount = this.cardElement.querySelector(`.${selectors.count}`);
  this.cardData = cardData;

  this.cardTitle.textContent = cardData[data.cardInfo.name];
  this.cardLink.src = cardData[data.cardInfo.link];
  this.cardLink.alt = cardData[data.cardInfo.name];

  this.addListeners = () => {
    this.cardDeleteButton.addEventListener('click', this.delete);
    this.cardLikeButton.addEventListener('click', this.like);
    this.cardImage.addEventListener('click', this.show);
  };

  this.removeListeners = () => {
    this.cardDeleteButton.removeEventListener('click', this.delete);
    this.cardLikeButton.removeEventListener('click', this.like);
    this.cardImage.removeEventListener('click', this.show);
  };

  this.delete = () => {
    cbDelete(this);
  };

  this.like = () => {
    cbLike(this.cardLikeButton, cardData._id, this.setLike);
  };

  this.show = () => {
    cbShow(cardData);
  };

  this.render = (...args) => {
    args.length === 1 && args.push('prepend');
    checkTypes(args, ['htmlulistelement', 'string']);
    const [cardList, method] = args;

    cardList[method](this.cardElement);
  };

  this.setLike = (...args) => {
    checkTypes(args, ['object']);
    const [cardData] = args;

    this.cardLikeButton.classList.toggle(selectors.isLiked);
    this.cardLikeCount.textContent = cardData.likes.length;
  };

  !isMyCard(cardData.owner._id, user._id) && this.cardDeleteButton.remove();

  hasLikeCard(cardData.likes, user._id)
    ? this.setLike(cardData)
    : this.cardLikeCount.textContent = cardData.likes.length;

  this.cardImage.onerror = () => {
    this.removeListeners();
    this.cardElement.remove();
  };

  this.addListeners();
};

const isMyCard = (...args) => {
  checkTypes(args, ['string', 'string']);
  const [cardOwn, id] = args;

  return cardOwn === id;
};

const hasLikeCard = (...args) => {
  checkTypes(args, ['array', 'string']);
  const [likes, id] = args;

  return likes.some(item => item._id === id);
}
