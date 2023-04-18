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
  ],
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
};
