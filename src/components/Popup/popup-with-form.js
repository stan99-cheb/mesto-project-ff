import { Popup } from "./popup";
import { selectors } from "../../utils/selectors";
import { checkTypes } from "../../utils/check-types";
/**
 * Конструктор для попапа с формой
 * @param {object} selectorsPopupWithForm 
 * @param {function} cbHandleSubmit 
 * @returns {object} объект с методами open, close, setValues
 */
export function PopupWithForm(selectorsPopupWithForm, cbHandleSubmit) {
  checkTypes(arguments, ['object', 'function']);

  this.element = document.querySelector(`.${selectorsPopupWithForm.element}`);
  this.buttonClose = this.element.querySelector(`.${selectorsPopupWithForm.buttonClose}`);
  this.popup = new Popup(this.element, this.buttonClose, selectors.popup, selectorsPopupWithForm.isAnimated);
  this.form = document.forms[selectorsPopupWithForm.formName];

  this.getValues = () =>
    [...this.form.elements].reduce(
      (acc, element) =>
        !!element.name
          ? { ...acc, [element.name]: element.value }
          : acc,
      {}
    );

  this.setValues = (formData) => {
    Object.keys(formData).forEach(
      key => {
        this.form[key].value = formData[key];
      }
    )
  };

  this.handleSubmit = (e) => {
    e.preventDefault();
    cbHandleSubmit(this.getValues());
    this.form.reset();
  };

  this.form.addEventListener('submit', this.handleSubmit);

  return Object.create(this.popup, {
    setValues: {
      value: this.setValues,
    },
  });
};