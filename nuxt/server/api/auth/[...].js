import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import { NuxtAuthHandler } from "#auth";
import { createTransport } from "nodemailer";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export default NuxtAuthHandler({
  // секрет, необходимый для запуска nuxt-auth в рабочем режиме (используется для шифрования данных)
  secret: "process.env.NUXT_SECRET",
  adapter: MongoDBAdapter(mongoClientAuth),
  pages: {
    // Измените поведение по умолчанию, чтобы использовать `/login` в качестве пути к странице входа
    signIn: "/site/user/login",
  },
  callbacks: {
    // Обратный вызов при создании / обновлении JWT, см. https://next-auth.js.org/configuration/callbacks#jwt-callback
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      return Promise.resolve(token);
    },
    // Обратный вызов всякий раз, когда проверяется сеанс, см. https://next-auth.js.org/configuration/callbacks#session-callback
    session: async ({ session, token }) => {
      return Promise.resolve(session);
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      /*   if (url.startsWith("/")) {
        console.log(111111);
        return `${baseUrl}${url}`;
      } */

      // Allows callback URLs on the same origin
      /* else if (new URL(url).origin === baseUrl) {
        console.log(333333);
        return url;
      } */
      return url;
    },
  },
  providers: [
    EmailProvider.default({
      // Имя, отображаемое в форме входа (например, "Войдите с помощью...")
      name: "email",
      server: {
        host: "smtp.spaceweb.ru",
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "admin@serega183.ru", // generated ethereal user
          pass: "parolAdmin183", // generated ethereal password
        },
      },
      from: '"Nuxt-next auth 👻" <admin@serega183.ru>',
    }),
    CredentialsProvider.default({
      // Имя, отображаемое в форме входа (например, "Войдите с помощью...")
      name: "Credentials",
      // Учетные данные используются для создания подходящей формы на странице входа.
      // Вы можете указать любые поля, которые, как вы ожидаете, будут отправлены.
      // например, домен, имя пользователя, пароль, токен 2FA и т.д.
      // Вы можете передать любой HTML-атрибут тегу <input> через объект.
      credentials: {
        username: { label: "qqq", type: "text", placeholder: "(hint: qqq)" },
        password: { label: "qqq", type: "password", placeholder: "(hint: qqq)" },
      },
      authorize(credentials) {
        // Вам нужно предоставить здесь свою собственную логику, которая принимает учетные данные
        // Отправлено и возвращает либо объект, представляющий пользователя, либо значение
        // это значение равно false/null, если учетные данные недействительны.
        // ПРИМЕЧАНИЕ: ПРИВЕДЕННАЯ НИЖЕ ЛОГИКА НЕБЕЗОПАСНА ИЛИ НЕ ПОДХОДИТ ДЛЯ АУТЕНТИФИКАЦИИ!
        const user = {
          id: "1",
          name: "qqq",
          password: "qqq",
          image: "https://avatars.githubusercontent.com/u/25911230?v=4",
          email: "email@mail.ru",
          phone: "88858758757",
        };

        if (credentials?.username === user.name && credentials?.password === user.password) {
          // Любой возвращенный объект будет сохранен в свойстве `user` JWT
          const u = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            id: user.id,
          };
          return user;
        } else {
          // eslint-disable-next-line no-console
          console.error(
            "Предупреждение: Зарегистрирована попытка вредоносного входа в систему, предоставлены неверные учетные данные"
          );

          // Если вы вернете значение null, то будет выведено сообщение об ошибке с рекомендацией пользователю проверить свои данные.
          return null;

          // Вы также можете отклонить этот обратный вызов с ошибкой, таким образом, пользователь будет отправлен на страницу ошибки с сообщением об ошибке в качестве параметра запроса
        }
      },
    }),
  ],
});

/*  */

async function sendVerificationRequest(params) {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport(provider.server);
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: html({ url, host, theme }),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function html(params) {
  const { url, host, theme } = params;

  const escapedHost = host.replace(/\./g, "&#8203;.");

  const brandColor = theme.brandColor || "#346df1";
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#fff",
  };

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
