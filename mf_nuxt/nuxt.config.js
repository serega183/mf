// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  ssr: true,
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "mf_site",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "my website description",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/logo.png" },
        { rel: "stylesheet", href: "/main.css" },
      ],
    },
  },
};
