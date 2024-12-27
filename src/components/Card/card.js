import { checkTypes } from '../../utils/check-types';
import { data } from '../../utils/constants';
/**
 * Конструктор для карточки
 * @param {object} selectors 
 * @param {object} cardData 
 * @param {function} cbDelete 
 * @param {function} cbLike 
 * @param {function} cbShow 
 * @returns {object} объект с методами create, render
 */
export function Card(selectors, cardData, cbDelete, cbLike, cbShow) {
  checkTypes(arguments, ['object', 'object', 'function', 'function', 'function']);

  this.cardElement = data.cardTemplate.querySelector(`.${selectors.element}`).cloneNode(true);
  this.cardDeleteButton = this.cardElement.querySelector(`.${selectors.deleteButton}`);
  this.cardLikeButton = this.cardElement.querySelector(`.${selectors.likeButton}`);
  this.cardImage = this.cardElement.querySelector(`.${selectors.image}`);

  this.cardElement.querySelector(`.${selectors.title}`).textContent = cardData['place-name'];
  this.cardElement.querySelector(`.${selectors.image}`).src = cardData['link'];
  this.cardElement.querySelector(`.${selectors.image}`).alt = `фотография ${cardData['place-name']}`;

  this.create = () => {
    return this.cardElement;
  };

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
    cbShow({
      src: this.cardImage.src,
      alt: this.cardImage.alt,
      caption: this.cardImage.alt,
    });
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
    create: this.create,
    render: this.render,
  }
};