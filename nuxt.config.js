export default {
  debug:true,
  server: {
    port: process.env.SERVERPORT,
    host: process.env.SERVERHOST
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Nordic IT Rental",
    htmlAttrs: {
      lang: "da"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/node_modules/@fortawesome/fontawesome-free/css/all.min.css",
    "~/assets/css/main.scss",
    "~/assets/css/flexboxgrid.min.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/globals.js",
    "~/plugins/filters/prices.js",
    "~/plugins/filters/date.js",
    "~/plugins/persistedState.client.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/google-analytics'
  ],

  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      "@nuxtjs/axios",
      {
        baseURL: process.env.API_URL
      }
    ],
    [
      "@nuxtjs/recaptcha",
      {
        hideBadge: false,
        siteKey: process.env.RECAPTCHA_SITE_KEY,
        version: 2
      }
    ],
    [
      "@nuxtjs/sitemap"
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    apiUrl: process.env.API_URL,
    googleApiKey: process.env.GOOGLE_MAPS_API_KEY,
    serviceApi: process.env.SERVICE_API,
    strapiAdminCredentials: {
      identifier: process.env.STRAPI_ADMIN_IDENTIFIER,
      password: process.env.STRAPI_ADMIN_PASSWORD
    }
  }
};
