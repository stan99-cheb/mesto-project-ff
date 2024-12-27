export const selectors = {
  cardsPlace: 'places__list',
  buttons: {
    addCard: 'profile__add-button',
    editProfile: 'profile__edit-button',
  },
  userInfo: {
    title: 'profile__title',
    description: 'profile__description',
  },
  card: {
    element: 'card',
    image: 'card__image',
    deleteButton: 'card__delete-button',
    likeButton: 'card__like-button',
    title: 'card__title',
    isLiked: 'card__like-button_is-active',
  },
  temlate: {
    card: 'card-template',
  },
  popup: {
    open: 'popup_is-opened',
    isAnimated: 'popup_is-animated',
  },
  popupWithImage: {
    element: 'popup_type_image',
    buttonClose: 'popup__close',
    image: 'popup__image',
    caption: 'popup__caption',
    isAnimated: true,
  },
  popupAddCard: {
    element: 'popup_type_new-card',
    buttonClose: 'popup__close',
    formName: 'new-place',
    isAnimated: true,
  },
  popupEditProfile: {
    element: 'popup_type_edit',
    buttonClose: 'popup__close',
    formName: 'edit-profile',
    isAnimated: true,
  },
};