import mysql from "mysql2/promise";
export default defineEventHandler(async (event) => {
  const { fields, write, cart, date } = await readBody(event);

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
  if (typeof fields["street"] !== "undefined") {
    fields.street.needValidate = {
      isEmpty: true,
    };
  }
  if (typeof fields["house"] !== "undefined") {
    fields.house.needValidate = {
      isEmpty: true,
    };
  }
  if (typeof fields["apartment"] !== "undefined") {
    fields.apartment.needValidate = {
      isEmpty: true,
    };
  }
  const validatefields = await $fetch("/api/validateFieldsRules", {
    method: "POST",
    body: { fields },
  });

  if ((await validatefields) instanceof Object) {
    return await validatefields;
  } else {
    /* const nomer = fields.phone.input.slice(fields.phone.input.length - 10);
    fields.phone.input = nomer;
    console.log(fields.phone.input); */
    if (write) {
      console.log("=======");
      /* ----------- */
      const user = {};
      for (const key in fields) {
        user[key] = fields[key].input;
      }
      /* ----------- */
      const order = [
        fields.name.input,
        Number(fields.phone.input),
        fields.street.input,
        fields.house.input,
        fields.apartment.input,
        fields.comment.input,
        JSON.stringify(cart),
        date.date,
        date.time,
      ];
      console.log(typeof order[1]);
      const sql = `INSERT INTO orders SET name=?, phone=?, street=?, house=?, apartment=?, comment=?, cart=?, date=?, time=?`;
      /* ----- */
      const con = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORS,
        database: process.env.MYSQL_DATABASE,
      });
      /* ----------- */
      try {
        const add = await con.query(sql, order);
        con.end();
        return true;
      } catch (error) {
        con.end();
        return `Ошибка записи в базу. writeOrder. ${error}`;
      }
      /* ------------- */
    }
    return await validatefields;
  }
  /*  */
});

async function sleep(...args) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return args;
}
