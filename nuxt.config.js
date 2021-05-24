export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'nordic-frontend',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/node_modules/@fortawesome/fontawesome-free/css/all.min.css',
        '~/assets/css/main.scss'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/globals.js',
        '~/plugins/filters/prices.js'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },

    env: {
        apiUrl: process.env.API_URL,
        googleApiKey: process.env.GOOGLE_MAPS_API_KEY
    },


}