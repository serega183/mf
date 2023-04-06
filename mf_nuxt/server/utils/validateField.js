export const minLength = (input, length) => {
  if (input.length < length) {
    return `Текст должен быть не менее ${length} символов`;
  }
  return true;
};
export function isEmpty(input) {
  if (input.length == 0) {
    return `Пустое поле недопустимо`;
  }
  return true;
}
