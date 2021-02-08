import colors from 'vuetify/es5/util/colors'

export default {
  buidlDir: 'dist',
  head: {
    titleTemplate: '%s | Watch your favorite anime',
    title: 'WAnime',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid:'description',
        name:'description',
        content:'Search and stream your favorite anime on wanime.me, highest quality available, dubbed and subbed anime. WAnime has free anime online in SUB and DUB HD. WAnime has 11,000+ Anime. Watch and download WAnime free without Registration.'
      },
      {
        name:'robots',
        content:'index,follow'
      },
      {
        name:'revisit-after',
        content:'1 days'
      },
      {
        name:'Referrer',
        content:'origin'
      },
      {
        property:'og:url',
        content:'https://wanime.me'
      },
      {
        property:'og:title',
        content:'WAnime - Watch download Anime Online English Sub and Dub'
      },
      {
        property:'og:description',
        content:'WAnime has free anime online in SUB and DUB HD. WAnimes has 11,000+ Anime. Watch and download WAnime free without Registration.'
      },
      {
        property:'og:site_name',
        content:'Wanime'
      },
      {
        property:'og:type',
        content:'website'
      },
      {
        property:'og:locale',
        content:"en"
      },
      {
        property:"og:image",
        content:'https://wanime.me/icon.png'
      },
      {
        property:'og:type',
        content:'image/png'
      },
      {
        'http-equiv':'content-language',
        content:'en'
      },
      {
        name:'mobile-web-app-capable',
        content:'yes'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'canonical', href:'https://wanime.me'}
    ]
  },

  env: {
    baseUrl: process.env.NODE_ENV === 'dev'? 'http://localhost:3000' : 'https://wanime.me'
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {
      src: './plugins/GoogleAnalytics.js',
      mode: 'client'
    }
  ],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/pwa'
  ],

  pwa:{
    manifest: {
      name: 'WAnime',
      lang: 'en',
      useWebmanifestExtension: false
    }
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#dc1354',
          accent: colors.teal.lighten4,
          secondary: colors.teal,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3

        },
        light:{
          primary: '#dc1354',
          accent: colors.teal.lighten4,
          secondary: colors.teal,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          bg: colors.grey.lighten2
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  serverMiddleware: [
    { path: "/api", handler: "~/api/index.js" },
  ],
}
