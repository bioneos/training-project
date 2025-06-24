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
        dsnApi: process.env.SENTRY_DSN_API
      }
    }
  },

  hooks: {
    'build:done': () => {
      // Add post-build hooks here (IF needed)
    }
  },

  sentry: {
    sourceMapsUploadOptions: {
      org: "test-org-3s",
      project: "training-project-sz",
    },
  },

  sourcemap: {
    client: "hidden",
  },
});