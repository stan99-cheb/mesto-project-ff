const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const addCard = (card, deleteCard) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = `фотография ${card.name}`;

  cardDeleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  }, { once: true });

  return cardElement;
};

const deleteCard = (cardElement) => {
  cardElement.remove();
};

const renderCard = (card, method = 'prepend') => {
  cardList[method](addCard(card, deleteCard))
};

initialCards.forEach(card => {
  renderCard(card, 'append');
});