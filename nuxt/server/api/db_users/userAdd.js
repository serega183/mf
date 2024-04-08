import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const { fields, write } = await readBody(event);
  /* Прослойка для валидации форм ввода  */
  //Смотрим название полей и  назначаем функции валидаторы
  if (typeof fields["name"] !== "undefined") {
    fields.name.needValidate = {
      isEmpty: true,
    };
  }
  if (typeof fields["phone"] !== "undefined") {
    fields.phone.needValidate = {
      isPhone: true,
    };
  }
  if (typeof fields["email"] !== "undefined") {
    fields.email.needValidate = {
      isEmail: true,
    };
  }
  if (typeof fields["pass"] !== "undefined") {
    fields.pass.needValidate = {
      isEmpty: true,
    };
  }

  const validatefields = await $fetch("/api/validateFieldsRules", {
    method: "POST",
    body: { fields },
  });

  if (validatefields instanceof Object) {
    return validatefields;
  } else {
    if (write) {
      /* поиск дубликатов email в таблице users */
      const doblMail = await $fetch("/api/db_users/userDuplicateFind", {
        method: "POST",
        body: { email: fields.email.input },
      });
      if (doblMail) {
        return { email: ["Пользователь с таким email уже зарегистрирован"] };
      }
      // это копипаста!!!
      const createUserForVerificationEmail = await $fetch(
        "/api/db_usersNoVerificatedEmail/createUserForVerificationEmail",
        {
          method: "POST",
          body: fields,
        }
      );
      /*  */
      return createUserForVerificationEmail;
    }
    return validatefields;
  }
  /*  */
});

async function sleep(...args) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return args;
}
