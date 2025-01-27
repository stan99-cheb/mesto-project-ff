import { checkTypes } from "../../utils/check-types";

export const loader = (...args) => {
  checkTypes(args, ['htmlbuttonelement']);
  const [element] = args;

  let elementText = element.textContent;

  return (...args) => {
    checkTypes(args, ['boolean', 'string']);
    const [isLoading, text] = args;

    isLoading
      ? element.textContent = text
      : element.textContent = elementText;
  };
};