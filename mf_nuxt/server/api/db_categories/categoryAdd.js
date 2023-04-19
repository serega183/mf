import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const { fields, write } = await readBody(event);
  /* Прослойка для валидации форм ввода  */
  //Смотрим название полей и  назначаем функции валидаторы
  if (typeof fields["cat_name"] !== "undefined") {
    fields.cat_name.needValidate = {
      minLength: 3,
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
      const cat = [fields.cat_name.input, fields.cat_discr.input, fields.cat_img.input];
      const sql = "INSERT INTO `categories`(`cat_name`, `cat_discr`, `cat_img`) VALUES(?, ?, ?)";
      try {
        const runtimeConfig = useRuntimeConfig();
        const con = await mysql.createConnection({
          host: runtimeConfig.mysqlHost,
          port: runtimeConfig.mysqlPort,
          user: runtimeConfig.mysqlUser,
          password: runtimeConfig.mysqlPassword,
          database: runtimeConfig.mysqlDatabase,
        });
        const add = await con.query(sql, cat);
        con.end();
        return true;
      } catch (error) {
        con.end();
        return `Ошибка записи в базу. categoryAdd. ${error}`;
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
