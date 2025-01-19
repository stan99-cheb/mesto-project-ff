import { checkTypes } from "../../utils/check-types";
import { Popup } from "./popup";
import { selectors } from "../../utils/selectors";
/**
 * Конструктор для попапа с формой
 * @param {object} selectorsPopupWithForm 
 * @param {function} cbHandleSubmit 
 * @returns {object} объект с методами open, close, setValues, setValidate
 */
export function PopupWithForm(selectorsPopupWithForm, cbHandleSubmit) {
  checkTypes(arguments, ['object', 'function']);

  this.element = document.querySelector(`.${selectorsPopupWithForm.element}`);
  this.popup = new Popup(this.element, selectors.popup, selectorsPopupWithForm.isAnimated);
  this.form = document.forms[selectorsPopupWithForm.formName];
  this.inputs = [...this.form.querySelectorAll('input')];
  this.buttonSubmit = this.form.querySelector('button[type="submit"]');

  this.toggleButton = () => {
    this.form.checkValidity()
      ? this.buttonSubmit.removeAttribute('disabled')
      : this.buttonSubmit.setAttribute('disabled', '');
  };

  this.setValidate = (...args) => {
    checkTypes(args, ['function', 'function']);
    const [cbHideError, cbShowError] = args;

    !this.form.checkValidity() && this.buttonSubmit.setAttribute('disabled', '');
    this.inputs.forEach(
      input => {
        input.addEventListener('input', () => {
          input.validity.patternMismatch
            ? input.setCustomValidity(input.dataset.errorMessage)
            : input.setCustomValidity('')
          input.validity.valid
            ? cbHideError(input)
            : cbShowError(input)
          this.toggleButton();
        });
      }
    );
  };

  this.getValues = () =>
    this.inputs.reduce(
      (acc, input) =>
        ({ ...acc, [input.name]: input.value }),
      {}
    );

  this.setValues = (...args) => {
    checkTypes(args, ['object']);
    const [formData] = args;

    Object.keys(formData).forEach(
      (key) => {
        this.form[key].value = formData[key];
      }
    );
  };

  this.handleSubmit = (e) => {
    e.preventDefault();
    cbHandleSubmit(this.getValues());
    this.form.reset();
    this.popup.close();
  };

  this.form.addEventListener('submit', this.handleSubmit);

  return Object.create(this.popup, {
    setValues: {
      value: this.setValues,
    },
    setValidate: {
      value: this.setValidate,
    },
  });
};