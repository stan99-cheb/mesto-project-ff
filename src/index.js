import './index.css';
import { Card } from "./components/Card/card";
import { checkTypes } from "./utils/check-types";
import { data } from "./utils/constants";
import { handleHideError, handleShowError } from './components/Validate/validate';
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

// -------------------------------- Слушатели кнопок --------------------------------
data.buttons.editProfile.addEventListener('click', () => {
  popupEditProfile.setValues({
    'title': data.userInfo.title.textContent,
    'description': data.userInfo.description.textContent,
  });
  popupEditProfile.setValidate(handleHideError, handleShowError);
  popupEditProfile.open();
});

data.buttons.addCard.addEventListener('click', () => {
  popupAddCard.setValidate(handleHideError, handleShowError);
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