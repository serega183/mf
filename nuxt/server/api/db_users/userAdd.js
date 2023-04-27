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
      isEmpty: true,
    };
  }
  if (typeof fields["pass"] !== "undefined") {
    fields.pass.needValidate = {
      isEmpty: true,
    };
  }
  /*  */

  const validatefields = await $fetch("/api/validateFieldsRules", {
    method: "POST",
    body: { fields },
  });

  if (validatefields instanceof Object) {
    return validatefields;
  } else {
    if (write) {
      const cat = [fields.name.input, fields.phone.input, fields.email.input, fields.pass.input];
      const sql = `INSERT INTO users SET name=?, phone=?, email=?, password=?`;
      const runtimeConfig = useRuntimeConfig();
      const con = await mysql.createConnection({
        host: runtimeConfig.mysqlHost,
        port: runtimeConfig.mysqlPort,
        user: runtimeConfig.mysqlUser,
        password: runtimeConfig.mysqlPassword,
        database: runtimeConfig.mysqlDatabase,
      });
      try {
        const add = await con.query(sql, cat);
        con.end();
        return true;
      } catch (error) {
        con.end();
        return `Ошибка записи в базу. usersAdd. ${error}`;
      }
    }
    return validatefields;
  }
  /*  */
});

async function sleep(...args) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return args;
}
