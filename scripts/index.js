const cardList = document.querySelector('.places__list');

const addCard = (name, link) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').setAttribute("src", link);

  cardDeleteButton.addEventListener('click', () => {
    cardElement.remove();
  }, { once: true });

  return cardElement;
};

initialCards.forEach(card => {
  const cardElement = addCard(card.name, card.link);
  cardList.append(cardElement);
});