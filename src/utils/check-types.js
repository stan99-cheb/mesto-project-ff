const typeOf = (arg) =>
  Object.prototype.toString.call(arg).match(/\s(\w+)/)[1].toLowerCase();

export const checkTypes = (args, types) => {
  [...args].forEach(
    (arg, i) => {
      if (typeOf(arg) !== types[i]) {
        throw new TypeError('Параметр ' + i + ' должен иметь тип ' + types[i] + '. Текущий тип ' + typeOf(arg));
      };
    }
  );
};