export default {
  debug: process.env.DEBUG ? process.env.DEBUG : false,
  server: {
    port: process.env.SERVERPORT,
    host: process.env.SERVERHOST,
  },
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  serverMiddleware: {
    '/_ipx': '~/server/middleware/ipx.js',
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  // Global page headers: https://go.nuxtjs.dev/config-head
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });
    return {
      title: 'Nordic IT Rental',
      htmlAttrs: {
        ...i18nHead.htmlAttrs,
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        ...i18nHead.meta,
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ...i18nHead.link,
      ],
    };
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/node_modules/@fortawesome/fontawesome-free/css/all.min.css',
    '~/assets/css/main.scss',
    '~/assets/css/flexboxgrid.min.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/globals.js',
    '~/plugins/filters/prices.js',
    '~/plugins/filters/date.js',
    '~/plugins/persistedState.client.js',
    '~/plugins/i18n.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/google-analytics'],

  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID,
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['@nuxtjs/tailwindcss'],
    ['@nuxtjs/apollo'],
    ['@nuxt/image'],
    [
      '@nuxtjs/axios',
      {
        baseURL: process.env.API_URL,
      },
    ],
    [
      '@nuxtjs/recaptcha',
      {
        hideBadge: false,
        siteKey: process.env.RECAPTCHA_SITE_KEY,
        version: 2,
      },
    ],
    ['@nuxtjs/sitemap'],
    [
      '@nuxtjs/i18n',
      {
        locales: [
          { code: 'en', name: 'English', iso: 'da-DK' },
          { code: 'da', name: 'Dansk', iso: 'en-US' },
        ],
        defaultLocale: 'da',
        baseUrl: 'https://nordicitrental.dk',
        parsePages: false,
        pages: {
          'om-nordicit-rental': {
            en: '/about',
            da: '/om-nordicit-rental',
          },
          'produkt/_product': {
            en: '/product/:product',
            da: '/produkt/:product',
          },
        },
      },
    ],
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.GRAPHQL_URL,
      },
    },
  },

  // image: {
  //   provider: 'ipx',
  //   // strapi: {
  //   //   baseURL: `${process.env.API_URL}/uploads/`,
  //   // },
  //   domains: [process.env.API_URL, process.env.GRAPHQL_URL],
  // },

  env: {
    apiUrl: process.env.API_URL,
    googleApiKey: process.env.GOOGLE_MAPS_API_KEY,
    serviceApi: process.env.SERVICE_API,
    strapiAdminCredentials: {
      identifier: process.env.STRAPI_ADMIN_IDENTIFIER,
      password: process.env.STRAPI_ADMIN_PASSWORD,
    },
  },
};
