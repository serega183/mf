import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const { fields, write } = await readBody(event);
  /* Прослойка для валидации форм ввода  */
  //Смотрим название полей и  назначаем функции валидаторы
  if (typeof fields["login"] !== "undefined") {
    fields.login.needValidate = {
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
  /*  */
  if ((await validatefields) instanceof Object) {
    return await validatefields;
  } else {
    if (write) {
      try {
        const runtimeConfig = useRuntimeConfig();
        const con = await mysql.createConnection({
          host: runtimeConfig.mysqlHost,
          port: runtimeConfig.mysqlPort,
          user: runtimeConfig.mysqlUser,
          password: runtimeConfig.mysqlPassword,
          database: runtimeConfig.mysqlDatabase,
        });
        // const [rows] = await con.query(`select * from users WHERE login=aaa`);
        const [rows] = await con.execute(
          `select * from users WHERE login='${fields.login.input}' AND password='${fields.pass.input}'`
        );
        con.end();
        if (rows[0]) {
          return { user: true, dara: rows };
        } else {
          return { err: "неверный логин или пароль" };
        }
      } catch (error) {
        //con.end();
        return `Ошибка чтения базы. login. ${error}`;
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
