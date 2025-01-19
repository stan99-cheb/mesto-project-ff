import { checkTypes } from "../../utils/check-types";
/**
 * Функция для скрытия элементов ошибки валидации
 * @param  {htmlinputelement} args
 */
export const handleHideError = (...args) => {
  checkTypes(args, ['htmlinputelement']);
  const [input] = args;

  const small = document.querySelector(`.${input.name}-input-error`)
  input.classList.remove('popup__input_type_error');
  small.textContent = '';
};
/**
 * Функция для показа элементов ошибки валидации
 * @param  {htmlinputelement} args
 */
export const handleShowError = (...args) => {
  checkTypes(args, ['htmlinputelement']);
  const [input] = args;

  const small = document.querySelector(`.${input.name}-input-error`);
  input.classList.add('popup__input_type_error');
  small.textContent = input.validationMessage;
};