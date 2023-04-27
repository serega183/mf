import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { NuxtAuthHandler } from "#auth";
export default NuxtAuthHandler({
  // секрет, необходимый для запуска nuxt-auth в рабочем режиме (используется для шифрования данных)
  secret: "process.env.NUXT_SECRET",
  pages: {
    // Измените поведение по умолчанию, чтобы использовать `/login` в качестве пути к странице входа
    signIn: "/site/user/login",
  },
  callbacks: {
    // Обратный вызов при создании / обновлении JWT, см. https://next-auth.js.org/configuration/callbacks#jwt-callback
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user ? user.id || "" : "";
        token.phone = user ? user.phone || "" : "";
        token.email = user ? user.email || "" : "";
      }
      return Promise.resolve(token);
    },
    // Обратный вызов всякий раз, когда проверяется сеанс, см. https://next-auth.js.org/configuration/callbacks#session-callback
    session: async ({ session, token }) => {
      session.role = token.role;
      session.id = token.id;
      session.phone = token.phone;
      session.email = token.email;
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
    // @ts-ignore Import экспортируется по умолчанию во время SSR, поэтому нам нужно вызвать его таким образом. Может быть исправлено с помощью Vite в какой-то момент
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // @ts-ignore Import экспортируется по умолчанию во время SSR, поэтому нам нужно вызвать его таким образом. Может быть исправлено с помощью Vite в какой-то момент
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
          role: "admin",
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
            role: user.role,
          };
          return u;
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
