import { checkTypes } from "../../utils/check-types";
import { Popup } from "./popup";
import { selectors } from "../../utils/selectors";

export function PopupWithConfirm(selectorsPopupWithConfirm, cbHandleSubmit) {
  checkTypes(arguments, ['object', 'function']);

  this.element = document.querySelector(`.${selectorsPopupWithConfirm.element}`);
  this.popup = new Popup(this.element, selectors.popup, selectorsPopupWithConfirm.isAnimated);
  this.form = document.forms[selectorsPopupWithConfirm.formName];
  this.buttonSubmit = this.form.querySelector('button[type="submit"]');

  this.open = (...args) => {
    checkTypes(args, ['object']);
    const [card] = args;

    this.popup.open();
    this.card = card;
  };

  this.handleSubmit = (e) => {
    e.preventDefault();
    cbHandleSubmit(this.card);
  };

  this.form.addEventListener('submit', this.handleSubmit);

  return Object.create(this.popup, Object.getOwnPropertyDescriptors(this));
};