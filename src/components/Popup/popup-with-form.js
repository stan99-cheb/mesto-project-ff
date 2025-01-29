import { checkTypes } from "../../utils/check-types";
import { Popup } from "./popup";
import { selectors } from "../../utils/selectors";

export function PopupWithForm(selectorsPopupWithForm, cbHandleSubmit, isValidate) {
  checkTypes(arguments, ['object', 'function', 'boolean']);

  this.element = document.querySelector(`.${selectorsPopupWithForm.element}`);
  this.popup = new Popup(this.element, selectors.popup, selectorsPopupWithForm.isAnimated);
  this.form = document.forms[selectorsPopupWithForm.formName];
  this.inputs = [...this.form.querySelectorAll('input')];
  this.buttonSubmit = this.form.querySelector('button[type="submit"]');

  this.getValues = () =>
    this.inputs.reduce(
      (acc, input) =>
        ({ ...acc, [input.name]: input.value }),
      {}
    );

  this.setValues = (...args) => {
    checkTypes(args, ['object']);
    const [formData] = args;

    this.inputs.forEach(input => {
      input.value = formData[input.name]
    })
  };

  this.handleSubmit = (e) => {
    e.preventDefault();
    cbHandleSubmit(this.getValues());
    this.popup.close();
    this.form.reset();
  };

  this.form.addEventListener('submit', this.handleSubmit);

  return Object.create(this.popup, Object.getOwnPropertyDescriptors(this));
};