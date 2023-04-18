export default defineEventHandler(async (event) => {
  const { fields } = await readBody(event);
  const errorsFields = {};
  for (const field in fields) {
    errorsFields[field] = [];
    if (!fields[field].needValidate) continue;
    const needValidate = fields[field].needValidate;
    /*  */
    if (needValidate.minLength) {
      if (minLength(fields[field].input, fields[field].needValidate.minLength) !== true) {
        errorsFields[field].push(
          minLength(fields[field].input, fields[field].needValidate.minLength)
        );
      }
    }
    /*  */
    if (needValidate.isEmpty) {
      if (isEmpty(fields[field].input) !== true) {
        errorsFields[field].push(isEmpty(fields[field].input));
      }
    }
    /*  */
    if (needValidate.isDigit) {
      if (isDigit(fields[field].input) !== true) {
        errorsFields[field].push(isDigit(fields[field].input));
      }
    }
    /*  */
    if (needValidate.isStock) {
      if (isStock(fields[field].input) !== true) {
        errorsFields[field].push(isStock(fields[field].input));
      }
    }
    /*  */
    if (needValidate.isRating) {
      if (isRating(fields[field].input) !== true) {
        errorsFields[field].push(isRating(fields[field].input));
      }
    }
    /*  */
    if (needValidate.isCheckCategory) {
      if (isCheckCategory(fields[field].input) !== true) {
        errorsFields[field].push(isCheckCategory(fields[field].input));
      }
    }
    /*  */
    if (needValidate.isPhone) {
      if (isPhone(fields[field].input) !== true) {
        errorsFields[field].push(isPhone(fields[field].input));
      }
    }
    /*  */
  }
  /* результат валидации */
  const errFields = {};
  for (const field in errorsFields) {
    if (errorsFields[field].length > 0) {
      errFields[field] = errorsFields[field];
    }
  }
  /* отправка результата */
  return Object.keys(errFields).length ? errFields : `Все поля заполнены верно`;
});

/* это правила валидации */
const minLength = (input, length) => {
  if (input.length < length) {
    return `Текст должен быть не менее ${length} символов`;
  }
  return true;
};
function isEmpty(input) {
  if (input.length == 0) {
    return `Пустое поле недопустимо`;
  }
  return true;
}
function isDigit(input) {
  if (Number.isNaN(Number(input))) {
    return `Введите целое число`;
  }
  return true;
}
function isStock(input) {
  if (input != 1 && input != 0) {
    return `0 - не входит в распродажу, 1 - входит в распродажу`;
  }
  return true;
}
function isRating(input) {
  if (input > 10 || input < 0) {
    return `Введите число от 0 до 10`;
  }
  return true;
}
function isCheckCategory(input) {
  if (input.length == 0) {
    return `Укажите категори(и/ю)`;
  }
  return true;
}
function isPhone(input) {
  if (input[0] != 8) {
    return "Номер должен начинаться с 8";
  }
  if (Number.isNaN(Number(input))) {
    return "Допустимы только цифры";
  }
  if (input.length != 11) {
    return "Введите 11 цифр";
  }

  return true;
}
