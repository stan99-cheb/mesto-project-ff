import { checkTypes } from "../../utils/check-types";

const handleHideError = (...args) => {
  checkTypes(args, ['htmlinputelement']);
  const [input] = args;

  const small = input.nextElementSibling;
  if (small && small.tagName === 'SMALL') {
    input.classList.remove('popup__input_type_error');
    small.textContent = '';
  }
};

const handleShowError = (...args) => {
  checkTypes(args, ['htmlinputelement']);
  const [input] = args;

  const small = input.nextElementSibling;
  if (small && small.tagName === 'SMALL') {
    input.classList.add('popup__input_type_error');
    small.textContent = input.validationMessage;
  }
};

const toggleButton = (...args) => {
  checkTypes(args, ['htmlformelement', 'htmlbuttonelement']);
  const [form, buttonSubmit] = args;

  form.checkValidity()
    ? buttonSubmit.removeAttribute('disabled')
    : buttonSubmit.setAttribute('disabled', '');
};

export const enableValidate = (...args) => {
  checkTypes(args, ['htmlformelement', 'array', 'htmlbuttonelement']);
  const [form, inputs, buttonSubmit] = args;

  inputs.forEach(
    input => {
      input.addEventListener('input', () => {
        input.validity.patternMismatch
          ? input.setCustomValidity(input.dataset.errorMessage)
          : input.setCustomValidity('')
        input.validity.valid
          ? handleHideError(input)
          : handleShowError(input)
        toggleButton(form, buttonSubmit);
      });
    }
  );
};

export const clearValidate = (...args) => {
  checkTypes(args, ['htmlformelement', 'array', 'htmlbuttonelement']);
  const [form, inputs, buttonSubmit] = args;

  inputs.forEach(input => {
    handleHideError(input);
    input.setCustomValidity('');
  });
  toggleButton(form, buttonSubmit);
};
