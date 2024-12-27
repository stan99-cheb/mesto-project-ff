import { checkTypes } from "../../utils/check-types";
/**
 * Конструктор для Попап
 * @param {htmldivelement} element 
 * @param {htmlbuttonelement} buttonClose 
 * @param {object} selectors 
 * @param {boolean} isAnimated 
 * @returns {object} объект с методами open, close
 */
export function Popup(element, buttonClose, selectors, isAnimated) {
  checkTypes(arguments, ['htmldivelement', 'htmlbuttonelement', 'object', 'boolean']);

  this.element = element;
  this.buttonClose = buttonClose;
  isAnimated && this.element.classList.add(selectors.isAnimated);

  this.handleClick = (e) => {
    this.element.isEqualNode(e.target) && this.close();
  };

  this.handleEscKey = (e) => {
    e.key === 'Escape' && this.close();
  };

  this.open = () => {
    this.element.classList.toggle(selectors.open);
    this.element.addEventListener('click', this.handleClick);
    document.addEventListener('keydown', this.handleEscKey);
  };

  this.close = () => {
    this.element.classList.toggle(selectors.open);
    this.element.removeEventListener('click', this.handleClick);
    document.removeEventListener('keydown', this.handleEscKey);
  };

  this.buttonClose.addEventListener('click', this.close);

  return {
    open: this.open,
    close: this.close,
  };
};