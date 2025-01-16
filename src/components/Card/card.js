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
export function Card(cardData, selectors, cbDelete, cbLike, cbShow) {
  checkTypes(arguments, ['object', 'object', 'function', 'function', 'function']);

  this.cardElement = data.cardTemplate.querySelector(`.${selectors.element}`).cloneNode(true);
  this.cardDeleteButton = this.cardElement.querySelector(`.${selectors.deleteButton}`);
  this.cardLikeButton = this.cardElement.querySelector(`.${selectors.likeButton}`);
  this.cardImage = this.cardElement.querySelector(`.${selectors.image}`);
  this.cardTitle = this.cardElement.querySelector(`.${selectors.title}`);
  this.cardLink = this.cardElement.querySelector(`.${selectors.image}`);

  this.cardTitle.textContent = cardData[data.cardInfo.name];
  this.cardLink.src = cardData[data.cardInfo.link];
  this.cardLink.alt = cardData[data.cardInfo.name];

  this.delete = () => {
    this.cardLikeButton.removeEventListener('click', this.like);
    this.cardImage.removeEventListener('click', this.show);
    cbDelete(cardData);
    this.cardElement.remove();
  };

  this.like = () => {
    cbLike(this.cardLikeButton);
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

  this.cardDeleteButton.addEventListener('click', this.delete, { once: true });
  this.cardLikeButton.addEventListener('click', this.like);
  this.cardImage.addEventListener('click', this.show);

  return {
    render: this.render,
  }
};