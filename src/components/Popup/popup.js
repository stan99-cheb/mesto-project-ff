import { checkTypes } from "../../utils/check-types";

export function Popup(element, selectors, isAnimated) {
  checkTypes(arguments, ['htmldivelement', 'object', 'boolean']);

  this.buttonClose = element.querySelector(`.${selectors.buttonClose}`);
  isAnimated && element.classList.add(selectors.isAnimated);

  this.handleClick = (e) => {
    element.isEqualNode(e.target) && this.close();
  };

  this.handleEscKey = (e) => {
    e.key === 'Escape' && this.close();
  };

  this.open = () => {
    element.classList.toggle(selectors.open);
    element.addEventListener('click', this.handleClick);
    document.addEventListener('keydown', this.handleEscKey);
  };

  this.close = () => {
    element.classList.toggle(selectors.open);
    element.removeEventListener('click', this.handleClick);
    document.removeEventListener('keydown', this.handleEscKey);
  };

  this.buttonClose.addEventListener('click', this.close);
};