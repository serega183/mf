import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const { fields, write } = await readBody(event);
  /*  */
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
      const data = [fields.cat_name.input, fields.cat_discr.input, fields.cat_img.input];
      const sql = `UPDATE categories SET cat_name=?, cat_discr=?, cat_img=? WHERE id_cat=${fields.id_cat.input}`;
      try {
        //const edit = await event.context.db_mf_mysql_01.query(sql, cat);
        const con = await mysql.createConnection({
          host: process.env.MYSQL_HOST,
          port: process.env.MYSQL_PORT,
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORS,
          database: process.env.MYSQL_DATABASE,
        });
        const edit = await con.query(sql, data);
        con.end();
        return true;
      } catch (error) {
        con.end();
        return `Ошибка записи в базу. categoryEdit. ${error}`;
      }
    }
    return validatefields;
  }
  /*  */

  /*  */
});
