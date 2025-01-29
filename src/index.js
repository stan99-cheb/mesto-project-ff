import './index.css';
import { Card } from "./components/Card/card";
import { checkTypes } from "./utils/check-types";
import { clearValidate, enableValidate } from './components/Validate/validate';
import { data } from "./utils/constants";
import { renderLoading } from './components/Loader/loader';
import { PopupWithConfirm } from './components/Popup/popup-with-confirm';
import { PopupWithForm } from "./components/Popup/popup-with-form";
import { PopupWithImage } from "./components/Popup/popup-with-image";
import { selectors } from "./utils/selectors";
import { UserInfo } from './components/User/user';
import * as api from './components/Api/api';

// -------------------------------- UserInfo --------------------------------
const userInfo = new UserInfo({
  name: data.userInfo.title.textContent,
  about: data.userInfo.description.textContent,
});
// --------------------------------------------------------------------------

// -------------------------------- Попапы --------------------------------
const popupEditProfile = new PopupWithForm(
  selectors.popupEditProfile,
  (...args) => {
    checkTypes(args, ['object']);
    const [userData] = args;

    renderLoadingFormEditProfile(true, 'Сохранение...');
    api.setUser(userData)
      .then(userInfo.set)
      .catch(console.log)
      .finally(() => {
        renderLoadingFormEditProfile(false);
      });
  }
);
const renderLoadingFormEditProfile = renderLoading(popupEditProfile.buttonSubmit);
enableValidate(popupEditProfile.form, popupEditProfile.inputs, popupEditProfile.buttonSubmit);

const popupAddCard = new PopupWithForm(
  selectors.popupAddCard,
  (...args) => {
    checkTypes(args, ['object']);
    const [cardData] = args;

    renderLoadingFormAddCard(true, 'Сохранение...')
    api.addCard(cardData)
      .then(cardData => {
        const card = new Card(cardData, selectors.card, popupConfirm.open, cardLike, cardShow, userInfo.get());
        card.render(data.cardList);
      })
      .catch(console.log)
      .finally(() => {
        renderLoadingFormAddCard(false);
      });
  }
);
const renderLoadingFormAddCard = renderLoading(popupAddCard.buttonSubmit);
enableValidate(popupAddCard.form, popupAddCard.inputs, popupAddCard.buttonSubmit);

const popupEditAvatar = new PopupWithForm(
  selectors.popupEditAvatar,
  (...args) => {
    checkTypes(args, ['object']);
    const [{ link }] = args;

    renderLoadingFormEditAvatar(true, 'Сохранение...')
    api.setAvatar(link)
      .then(userInfo.set)
      .catch(console.log)
      .finally(() => {
        renderLoadingFormEditAvatar(false);
      });
  }
);
const renderLoadingFormEditAvatar = renderLoading(popupEditAvatar.buttonSubmit);
enableValidate(popupEditAvatar.form, popupEditAvatar.inputs, popupEditAvatar.buttonSubmit);

const popupConfirm = new PopupWithConfirm(selectors.popupConfirm, cardDel);
const popupWithImage = new PopupWithImage(selectors.popupWithImage);
// ------------------------------------------------------------------------------

// -------------------------------- Слушатели кнопок --------------------------------
data.buttons.editProfile.addEventListener('click', () => {
  popupEditProfile.setValues(userInfo.get());
  clearValidate(popupEditProfile.form, popupEditProfile.inputs, popupEditProfile.buttonSubmit);
  popupEditProfile.open();
});

data.buttons.addCard.addEventListener('click', () => {
  clearValidate(popupAddCard.form, popupAddCard.inputs, popupAddCard.buttonSubmit);
  popupAddCard.open();
});

data.buttons.editAvatar.addEventListener('click', () => {
  clearValidate(popupEditAvatar.form, popupEditAvatar.inputs, popupEditAvatar.buttonSubmit);
  popupEditAvatar.open();
});
// ------------------------------------------------------------------------------

// -------------------------------- Колбэки Card --------------------------------
function cardDel(...args) {
  checkTypes(args, ['object']);
  const [{ cardData, cardElement, removeListeners }] = args;

  api.delCard(cardData._id)
    .then((response) => {
      removeListeners();
      cardElement.remove();
      console.log(response.message);
    })
    .catch(console.log)
    .finally(popupConfirm.close);
};

const cardLike = (...args) => {
  checkTypes(args, ['htmlbuttonelement', 'string', 'function']);
  const [cardLikeButton, cardID, setLike] = args;

  if (cardLikeButton.classList.contains(selectors.card.isLiked)) {
    api.delLike(cardID)
      .then(setLike)
      .catch(console.log);
  } else {
    api.addLike(cardID)
      .then(setLike)
      .catch(console.log);
  }
};

const cardShow = (...args) => {
  checkTypes(args, ['object']);
  const [cardImageData] = args;

  popupWithImage.show(cardImageData);
  popupWithImage.open();
};
// ------------------------------------------------------------------------------

Promise.all([api.getUser(), api.getCards()])
  .then(([user, cards]) => {
    userInfo.set(user);

    cards.forEach(cardData => {
      const card = new Card(cardData, selectors.card, popupConfirm.open, cardLike, cardShow, user);
      card.render(data.cardList, 'append');
    });
  })
  .catch(console.log);