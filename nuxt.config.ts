// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  telemetry: false,
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@sentry/nuxt/module"],

  devServer: {
    port: Number(process.env.APP_PORT),
  },

  srcDir: "src/",

  typescript: {
    strict: false,
  },

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    public: {
      sentry: {
        dsnClient: process.env.SENTRY_DSN_CLIENT,
        dsnApi: process.env.SENTRY_DSN_API,
        environment: process.env.ENV,
        isStatusFilter: process.env.SENTRY_IS_FILTER_STATUS,
      }
    }
  },

  hooks: {
    'build:done': () => {
      // Add post-build hooks here (IF needed)
    }
  },

  // This add the client source map of the code to Sentry for stack tracing. 
  sentry: {
    sourceMapsUploadOptions: {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_CLIENT_PROJECT,
    },
  },

  // Sentry enable source map for server by default (hidden)
  // true: send sourcemap; 
  // false: do not send sourcemap; 
  // hidden: send sourcemap but prevent source map reference comments.
  sourcemap: {
    server: "hidden",
    client: "hidden",
  },
});