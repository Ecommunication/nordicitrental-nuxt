import createSitemapRoutes from './utils/createSitemapRoutes';

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
      script: [
        {
          src: '',
        },
        {
          type:'text/javascript',
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WD8JHKG');`,
        }
      ],
      __dangerouslyDisableSanitizers: ['script']
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
    recaptcha: {
      siteKey: process.env.RECAPTCHA_SITE_KEY,
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
    [
      '@nuxtjs/sitemap',
      {
        hostname: 'https://nordicitrental.dk',
        trailingSlash: true,
        gzip: true,
        routes: createSitemapRoutes,
      },
    ],
    [
      '@nuxtjs/i18n',
      {
        detectBrowserLanguage: {
          useCookie: true,
        },
        locales: [
          { code: 'en', name: 'English', iso: 'en-US' },
          { code: 'da', name: 'Dansk', iso: 'da-DK' },
        ],
        defaultLocale: 'da',
        vueI18nLoader: true,
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
          'produkt-kategori/_': {
            en: '/product-category/:route?/:productcategory',
            da: '/produkt-kategori/:route?/:productcategory',
          },
          'alle-produktkategorier': {
            en: '/all-product-categories',
            da: '/alle-produktkategorier',
          },
          'kurv/index': {
            en: '/cart',
            da: '/kurv',
          },
          'kurv/ordre': {
            en: '/cart/order',
            da: '/kurv/ordre',
          },
          'kurv/kvittering': {
            en: '/cart/receipt',
            da: '/kurv/kvittering',
          },
          kontakt: {
            en: '/contact',
            da: '/kontakt',
          },
          'spoergsmaal-og-svar': {
            en: '/faq',
            da: '/spoergsmaal-og-svar',
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

  image: {
    provider: 'strapi',
    strapi: {
      baseURL: `${process.env.API_URL}`,
    },
    domains: [process.env.API_URL, process.env.GRAPHQL_URL],
  },

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
