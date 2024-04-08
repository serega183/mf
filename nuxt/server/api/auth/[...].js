import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import mysql from "mysql2/promise";
export default NuxtAuthHandler({
  // секрет, необходимый для запуска nuxt-auth в рабочем режиме (используется для шифрования данных)
  secret: "process.env.NUXT_SECRET",
  pages: {
    // Измените поведение по умолчанию, чтобы использовать `/login` в качестве пути к странице входа
    signIn: "/site/user/auth/login",
  },
  callbacks: {
    // Обратный вызов при создании / обновлении JWT, см. https://next-auth.js.org/configuration/callbacks#jwt-callback
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.role = user ? user.role || "" : "";
        token.phone = user ? user.phone || "" : "";
        token.email = user ? user.email || "" : "";
      }
      return Promise.resolve(token);
    },
    // Обратный вызов всякий раз, когда проверяется сеанс, см. https://next-auth.js.org/configuration/callbacks#session-callback
    session: async ({ session, token }) => {
      session.user.role = token.role;
      session.user.phone = token.phone;
      session.user.email = token.email;
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
      async authorize(credentials) {
        /*  */
        const runtimeConfig = useRuntimeConfig();
        const con = await mysql.createConnection({
          host: runtimeConfig.mysqlHost,
          port: runtimeConfig.mysqlPort,
          user: runtimeConfig.mysqlUser,
          password: runtimeConfig.mysqlPassword,
          database: runtimeConfig.mysqlDatabase,
        });
        const [user] = await con.query(
          `select * from users WHERE email LIKE "%${credentials?.email}%"`
        );
        con.end();
        /*  */
        // Вам нужно предоставить здесь свою собственную логику, которая принимает учетные данные
        // Отправлено и возвращает либо объект, представляющий пользователя, либо значение
        // это значение равно false/null, если учетные данные недействительны.
        // ПРИМЕЧАНИЕ: ПРИВЕДЕННАЯ НИЖЕ ЛОГИКА НЕБЕЗОПАСНА ИЛИ НЕ ПОДХОДИТ ДЛЯ АУТЕНТИФИКАЦИИ!

        if (credentials?.email === user[0].email && credentials?.password === user[0].password) {
          // Любой возвращенный объект будет сохранен в свойстве `user` JWT
          return user[0];
        } else {
          // Если вы вернете значение null, то будет выведено сообщение об ошибке с рекомендацией пользователю проверить свои данные.
          return null;
          // Вы также можете отклонить этот обратный вызов с ошибкой, таким образом, пользователь будет отправлен на страницу ошибки с сообщением об ошибке в качестве параметра запроса
        }
      },
    }),
  ],
});
