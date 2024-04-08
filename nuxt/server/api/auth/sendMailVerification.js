import nodemailer from "nodemailer";
export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const { email, token } = await readBody(event);
  //return `Ответ от сенд майл email: ${email} и token: ${token}`;
  // console.log("log server middleware");
  /*   const query = getQuery(event);
  console.log("--- Log: " + event.node.req.url);
  console.log(query);
  console.log("--------------"); */
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
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
        subject: `${runtimeConfig.appName} код подтверждения`, // Subject line
        text: token, // plain text body
        html: `<b>Код подтверждения: ${token}</b>`, // html body
      })
      .catch((err) => {
        return { err: err };
      });
    return true;
  }
  return main();
});
