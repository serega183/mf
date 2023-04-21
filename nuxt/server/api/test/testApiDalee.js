export default defineEventHandler(async (event) => {
  const { fields, write } = await readBody(event);
  /* Прослойка для валидации форм ввода  */
  //Смотрим название полей и  назначаем функции валидаторы
  if (typeof fields["name"] !== "undefined") {
    fields.name.needValidate = {
      isEmpty: true,
      minLength: 5,
    };
  }
  if (typeof fields["age"] !== "undefined") {
    fields.age.needValidate = {
      isEmpty: true,
      digit: true,
      minLength: 5,
    };
  }

  const validateFields = await $fetch("/api/validateFieldsRules", {
    method: "POST",
    body: { fields },
  });
  if (validateFields instanceof Object) {
    return validateFields;
  } else {
    if (write) {
      return await $fetch("/api/test/hello?qqq=123");
    }
    return validateFields;
  }
  /*  */
});
