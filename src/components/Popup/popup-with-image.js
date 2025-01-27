import { checkTypes } from "../../utils/check-types";
import { data } from "../../utils/constants";
import { Popup } from "./popup";
import { selectors } from "../../utils/selectors";

export function PopupWithImage(selectorsPopupWithImage) {
  checkTypes(arguments, ['object']);

  this.element = document.querySelector(`.${selectorsPopupWithImage.element}`);
  this.popup = new Popup(this.element, selectors.popup, selectorsPopupWithImage.isAnimated);
  this.image = this.element.querySelector(`.${selectorsPopupWithImage.image}`);
  this.caption = this.element.querySelector(`.${selectorsPopupWithImage.caption}`);

  this.show = (...args) => {
    checkTypes(args, ['object']);
    const [cardImageData] = args;

    this.image.src = cardImageData[data.cardInfo.link];
    this.image.alt = cardImageData[data.cardInfo.name];
    this.caption.textContent = cardImageData[data.cardInfo.name];
  };

  return Object.create(this.popup, Object.getOwnPropertyDescriptors(this));
};