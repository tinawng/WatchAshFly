export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  ssr: false,

  server: {
    host: "0.0.0.0"
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Watch Ash Fly',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Watch Ash Fly' },

      { hid: 'og:type', name: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', name: 'og:title', property: 'og:title', content: 'Watch Ash Fly' },
      { hid: 'og:site_name', name: 'og:site_name', property: 'og:site_name', content: 'Watch Ash Fly' },
      { hid: 'og:description', name: 'og:description', property: 'og:description', content: '$ASH and Fungibles stats' },
      { hid: 'og:url', name: 'og:url', property: 'og:url', content: 'https://watchashfly.tina.cafe/' },
      { hid: 'twitter:card', name: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:image', name: 'twitter:image', property: 'twitter:image', content: 'https://watchashfly.tina.cafe/preview.jpg' },
      { hid: 'og:image', name: 'og:image', property: 'og:image', content: 'https://watchashfly.tina.cafe/preview.jpg' },
      { hid: 'og:image:width', name: 'og:image:width', property: 'og:image:width', content: '1200' },
      { hid: 'og:image:height', name: 'og:image:height', property: 'og:image:height', content: '630' }
    ],
    htmlAttrs: {
      lang: 'en'
    },
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "@/assets/css/base.postcss"
  ],

  http: {
    baseURL: process.env.REQ_API,
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/http',
    '@nuxtjs/dotenv'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyElements: true
      }
    },
    postcss: {
      preset: {
        features: {
          // Fixes: https://github.com/tailwindcss/tailwindcss/issues/1190#issuecomment-546621554
          "focus-within-pseudo-class": false
        }
      }
    }
  },

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        if (type === 'font') return /.woff2/.test(file)
        return ['script', 'style'].includes(type)
      }
    }
  }
}
