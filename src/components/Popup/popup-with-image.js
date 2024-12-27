import { checkTypes } from "../../utils/check-types";
import { Popup } from "./popup";
import { selectors } from "../../utils/selectors";
/**
 * Конструктор для попапа с картинкой
 * @param {object} selectorsPopupWithImage 
 * @returns {object} объект с методами open, close, show
 */
export function PopupWithImage(selectorsPopupWithImage) {
  checkTypes(arguments, ['object']);

  this.element = document.querySelector(`.${selectorsPopupWithImage.element}`);
  this.buttonClose = this.element.querySelector(`.${selectorsPopupWithImage.buttonClose}`);
  this.popup = new Popup(this.element, this.buttonClose, selectors.popup, selectorsPopupWithImage.isAnimated);
  this.image = this.element.querySelector(`.${selectorsPopupWithImage.image}`);
  this.caption = this.element.querySelector(`.${selectorsPopupWithImage.caption}`);

  this.show = ({ src, alt, caption }) => {
    this.image.src = src;
    this.image.alt = alt;
    this.caption.textContent = caption;
  };

  return Object.create(this.popup, {
    show: {
      value: this.show,
    },
  });
};