import mysql from "mysql2/promise";
import nodemailer from "nodemailer";
//import { getServerSession } from "#auth";
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

      const sql = `INSERT INTO orders SET name=?, phone=?, street=?, house=?, apartment=?, comment=?, cart=?, date=?, time=?`;
      /* ----- */
      const runtimeConfig = useRuntimeConfig();
      const con = await mysql.createConnection({
        host: runtimeConfig.mysqlHost,
        port: runtimeConfig.mysqlPort,
        user: runtimeConfig.mysqlUser,
        password: runtimeConfig.mysqlPassword,
        database: runtimeConfig.mysqlDatabase,
      });
      /* ----------- */
      try {
        const add = await con.query(sql, order);
        con.end();
        /* пишем юзеру id заказа */
        /* const session = await getServerSession(event);
        const writeOrderToUser = await $fetch("/api/db_users/writeOrderToUser", {
          method: "POST",
          body: { email: session.user.email, id: add[0].insertId },
        });
        return writeOrderToUser; */

        // оповещаем на почту о новом заказе
        // sendMailToAdminNewOreder(add[0].insertId);
        return await sendMailToAdminNewOreder(add[0].insertId);
        /*  */
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

async function sendMailToAdminNewOreder(id) {
  const runtimeConfig = useRuntimeConfig();
  let transporter = nodemailer.createTransport({
    host: runtimeConfig.emailHost,
    port: runtimeConfig.emailPort,
    secure: runtimeConfig.emailSecure, // true for 465, false for other ports
    auth: {
      user: runtimeConfig.emailUser, // generated ethereal user
      pass: runtimeConfig.emailPass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter
    .sendMail({
      from: `${runtimeConfig.appName} <admin@serega183.ru>`, // sender address
      to: runtimeConfig.sendMailToAdminNewOreder, // list of receivers
      subject: `${runtimeConfig.appName} Новый заказ`, // Subject line
      text: "Новый заказ", // plain text body
      html: `<b>Новый заказ ${id}</b>`, // html body
    })
    .catch((err) => {
      return { err: err };
    });
  return true;
}
