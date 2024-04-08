import nodemailer from "nodemailer";
export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const { fields, write } = await readBody(event);
  /* Прослойка для валидации форм ввода  */
  //Смотрим название полей и  назначаем функции валидаторы
  if (typeof fields["email"] !== "undefined") {
    fields.email.needValidate = {
      isEmail: true,
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
      /* поиск user */
      const user = await $fetch("/api/db_users/userGet", {
        method: "POST",
        body: { email: fields.email.input },
      });
      if (user) {
        return await sendMail(user.email, user.password);
      } else {
        return { user: false };
      }
    }
    return validatefields;
  }
  /*  */
});

async function sendMail(email, pass) {
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
      to: email, // list of receivers
      subject: `${runtimeConfig.appName} Ваш пароль`, // Subject line
      text: pass, // plain text body
      html: `<b>Пароль: ${pass}</b>`, // html body
    })
    .catch((err) => {
      return { err: err };
    });
  return true;
}
