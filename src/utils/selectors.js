export const selectors = {
  cardsPlace: 'places__list',
  buttons: {
    addCard: 'profile__add-button',
    editProfile: 'profile__edit-button',
    editAvatar: 'profile__avatar',
  },
  userInfo: {
    title: 'profile__title',
    description: 'profile__description',
    avatar: 'profile__avatar',
  },
  card: {
    element: 'card',
    image: 'card__image',
    deleteButton: 'card__delete-button',
    likeButton: 'card__like-button',
    title: 'card__title',
    isLiked: 'card__like-button_is-active',
    count: 'card__like-count',
  },
  temlate: {
    card: 'card-template',
  },
  popup: {
    open: 'popup_is-opened',
    buttonClose: 'popup__close',
    isAnimated: 'popup_is-animated',
  },
  popupWithImage: {
    element: 'popup_type_image',
    image: 'popup__image',
    caption: 'popup__caption',
    isAnimated: true,
  },
  popupAddCard: {
    element: 'popup_type_new-card',
    formName: 'new-place',
    isAnimated: true,
  },
  popupEditProfile: {
    element: 'popup_type_edit',
    formName: 'edit-profile',
    isAnimated: true,
  },
  popupEditAvatar: {
    element: 'popup_type_avatar',
    formName: 'edit-avatar',
    isAnimated: true,
  },
  popupConfirm: {
    element: 'popup_type_confirm',
    formName: 'confirm',
    isAnimated: true,
  },
  validate: {
    error: 'popup__input-error',
  },
};