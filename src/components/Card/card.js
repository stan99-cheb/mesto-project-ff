const cardTemplate = document.querySelector('#card-template').content;

export function Card(selectors, cardData, cbDelete, cbLike, cbShow) {
  this.cardElement = cardTemplate.querySelector(selectors.card).cloneNode(true);
  this.cardDeleteButton = this.cardElement.querySelector(selectors.cardDeleteButton);
  this.cardLikeButton = this.cardElement.querySelector(selectors.cardLikeButton);
  this.cardImage = this.cardElement.querySelector(selectors.cardImage);

  this.cardElement.querySelector(selectors.cardTitle).textContent = cardData.name;
  this.cardElement.querySelector(selectors.cardImage).src = cardData.link;
  this.cardElement.querySelector(selectors.cardImage).alt = `фотография ${cardData.name}`;

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

  this.setEventListener(this.cardDeleteButton, 'click', this.delete, { once: true });
  this.setEventListener(this.cardLikeButton, 'click', this.like);
  this.setEventListener(this.cardImage, 'click', this.show);

  return {
    create: this.create,
  }
};