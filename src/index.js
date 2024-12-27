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
    const [dataCard] = args;
    const card = new Card(selectors.card, dataCard, cardDel, cardLike, cardShow);
    card.render(data.cardList);
    popupAddCard.close();
  }
);

const popupEditProfile = new PopupWithForm(
  selectors.popupEditProfile,
  (...args) => {
    checkTypes(args, ['object']);
    const [dataProfile] = args;
    data.userInfo.title.textContent = dataProfile['title'];
    data.userInfo.description.textContent = dataProfile['description'];
    popupEditProfile.close();
  }
);
// ------------------------------------------------------------------------------

// -------------------------------- Слушатели кнопок --------------------------------
data.buttons.addCard.addEventListener('click', popupAddCard.open);
data.buttons.editProfile.addEventListener('click', () => {
  popupEditProfile.setValues({
    'title': data.userInfo.title.textContent,
    'description': data.userInfo.description.textContent,
  });
  popupEditProfile.open();
});
// ------------------------------------------------------------------------------

// -------------------------------- Колбэки Card --------------------------------
const cardDel = (...args) => {
  checkTypes(args, ['object']);
  const [cardData] = args;
  console.log(`Карточка ${cardData['place-name']} удалена`);
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

initialCards.forEach(dataCard => {
  const card = new Card(selectors.card, dataCard, cardDel, cardLike, cardShow);
  card.render(data.cardList, 'append');
});