import { Card } from "./components/Card/card";
import { checkTypes } from "./utils/check-types";
import { data } from "./utils/constants";
import { PopupWithForm } from "./components/Popup/popup-with-form";
import { PopupWithImage } from "./components/Popup/popup-with-image";
import { selectors } from "./utils/selectors";
import initialCards from "./data/cards-data";

// -------------------------------- Попапы --------------------------------
const popupWithImage = new PopupWithImage(selectors.popupWithImage);

const popupAddCard = new PopupWithForm(
  selectors.popupAddCard,
  (...args) => {
    checkTypes(args, ['object']);
    const [cardData] = args;

    const card = new Card(cardData, selectors.card, cardDel, cardLike, cardShow);
    card.render(data.cardList);
  }
);

const popupEditProfile = new PopupWithForm(
  selectors.popupEditProfile,
  (...args) => {
    checkTypes(args, ['object']);
    const [dataProfile] = args;

    data.userInfo.title.textContent = dataProfile['title'];
    data.userInfo.description.textContent = dataProfile['description'];
  }
);
// ------------------------------------------------------------------------------

// ------------------------- Колбэки проверки валидации -------------------------
const hideError = (...args) => {
  checkTypes(args, ['htmlinputelement']);
  const [input] = args;

  input.classList.remove(selectors.validate.error);
};

const showError = (...args) => {
  checkTypes(args, ['htmlinputelement']);
  const [input] = args;

  input.classList.add(selectors.validate.error);
};
// ------------------------------------------------------------------------------

// -------------------------------- Слушатели кнопок --------------------------------
data.buttons.editProfile.addEventListener('click', () => {
  popupEditProfile.setValues({
    'title': data.userInfo.title.textContent,
    'description': data.userInfo.description.textContent,
  });
  popupEditProfile.setValidate(hideError, showError);
  popupEditProfile.open();
});

data.buttons.addCard.addEventListener('click', () => {
  popupAddCard.setValidate(hideError, showError);
  popupAddCard.open();
});
// ------------------------------------------------------------------------------

// -------------------------------- Колбэки Card --------------------------------
const cardDel = (...args) => {
  checkTypes(args, ['object']);
  const [cardData] = args;

  console.log(`Карточка "${cardData[data.cardInfo.name]}" удалена`);
};

const cardLike = (...args) => {
  checkTypes(args, ['htmlbuttonelement']);
  const [cardLikeButton] = args;

  cardLikeButton.classList.toggle(selectors.card.isLiked);
};

const cardShow = (...args) => {
  checkTypes(args, ['object']);
  const [cardImageData] = args;

  popupWithImage.show(cardImageData);
  popupWithImage.open();
};
// ------------------------------------------------------------------------------

initialCards.forEach(cardData => {
  const card = new Card(cardData, selectors.card, cardDel, cardLike, cardShow);
  card.render(data.cardList, 'append');
});