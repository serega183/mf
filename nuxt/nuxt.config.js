// https://nuxt.com/docs/api/configuration/nuxt-config
process.env.TZ = "Europe/Moscow";
export default {
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
    "@sidebase/nuxt-auth",
  ],
  auth: {
    origin: process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : "https://mfnuxt.serega183.ru",
    enableGlobalAppMiddleware: true,
    addDefaultCallbackUrl: true,
  },
  imports: {
    dirs: ["stores", "composables/cart/*.{ts,js,mjs,mts}"],
  },
  ssr: true,
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/logo.png" },
        { rel: "stylesheet", href: "/main.css" },
      ],
    },
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    mysqlHost: "mf_mysql",
    mysqlPort: "3306",
    mysqlUser: "mf_user",
    mysqlPassword: "mf_user_pass",
    mysqlDatabase: "mf_mysql_01",
  },
};
