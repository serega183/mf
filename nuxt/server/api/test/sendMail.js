import nodemailer from "nodemailer";
export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig();
  // console.log("log server middleware");
  /*   const query = getQuery(event);
  console.log("--- Log: " + event.node.req.url);
  console.log(query);
  console.log("--------------"); */
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

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
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <admin@serega183.ru>', // sender address
      to: "serega183@mail.ru", // list of receivers
      subject: "Hello ✔", // Subject line
      text: `Hello world?`, // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
});
